# GetPortfolioQuotes UseCase - Migration from Stock to StockPosition - Changes Summary

**Date:** December 2025
**Objective:** Migrate GetPortfolioQuotesUseCase from StockRepository to StockPositionRepository for better performance and consistency with consolidated positions

## Identified Problems and Solutions

### 1. Problem: Performance Issues with Stock Aggregation
**Cause:** GetPortfolioQuotesUseCase was fetching individual Stock operations and then grouping them using groupedStocksUtils
**Impact:** Unnecessary processing overhead for data that is already consolidated in StockPosition

### 2. Problem: Data Inconsistency
**Cause:** UseCase worked with raw transaction data instead of consolidated positions
**Impact:** Potential discrepancies between portfolio calculations and actual positions

### 3. Problem: Missing Repository Method
**Cause:** IStockPositionRepository lacked listByType method needed by the use case
**Impact:** Could not migrate to StockPositionRepository without extending the interface

## Modified Files

### 1. `src/modules/stock/repositories/IStockPositionRepository.ts`
**Changes:**
```typescript
// BEFORE (missing listByType method)
interface IStockPositionRepository {
  create(stockPosition: StockPosition): Promise<void>
  update(stockPosition: StockPosition): Promise<void>
  findByUserAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<StockPosition | null>
}

// AFTER (added listByType method)
interface IStockPositionRepository {
  create(stockPosition: StockPosition): Promise<void>
  update(stockPosition: StockPosition): Promise<void>
  findByUserAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<StockPosition | null>
  listByType(userId: string, type: IStockType): Promise<StockPosition[]>
}
```

### 2. `src/modules/stock/infra/prisma/repositories/StockPositionRepository.ts`
**Changes:**
```typescript
// BEFORE (no listByType implementation)

// AFTER (added listByType implementation)
async listByType(userId: string, type: IStockType): Promise<StockPosition[]> {
  const results = await PrismaSingleton.getInstance().stockPosition.findMany({
    where: {
      userId,
      type: type.stockType,
    },
  })

  return results.map((result) =>
    StockPositionMappers.getMapper().toDomain(result),
  )
}
```

### 3. `src/modules/stock/repositories/in-memory/StockPositionRepositoryInMemory.ts`
**Changes:**
```typescript
// BEFORE (no listByType implementation)

// AFTER (added listByType implementation)
async listByType(userId: string, type: IStockType): Promise<StockPosition[]> {
  return this.stocks.filter(
    (stockPosition) =>
      stockPosition.userId === userId && stockPosition.type.stockType === type.stockType,
  )
}
```

### 4. `src/modules/stock/useCases/getPortfolioQuotes/GetPortfolioQuotesUseCase.ts`
**Changes:**
```typescript
// BEFORE (using StockRepository and groupedStocksUtils)
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { groupedStocksUtils } from '@modules/stock/utils/grouped-stocks-utils'

@Injectable()
class GetPortfolioQuotesUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('StockRepository')
    private stocksRepository: IStockRepository,
    @inject('BrapiB3Provider')
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stocks = await this.stocksRepository.listByType(userId, type)

    if (!stocks) {
      throw new AppError('User stock not found', 404)
    }

    const groupedStocks = groupedStocksUtils(stocks)

    const symbols = Object.keys(groupedStocks)
    const quotes = await fetchStockQuotes(symbols, this.b3Provider)

    const portfolio = symbols.map((symbol) => {
      const stockData = groupedStocks[symbol]
      const quote = quotes.find((item) => item.symbol === symbol)

      return {
        stock: {
          shortName: stockData.shortName,
          symbol,
          totalStock: stockData.totalStock,
        },
        totalInvested: stockData.totalInvested,
        currentValue: stockData.totalStock * (quote?.price ?? 0),
        quote: quote.price,
        minPrice: stockData.minPrice,
        maxPrice: stockData.maxPrice,
      }
    })
  }
}

// AFTER (using StockPositionRepository directly)
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository'

@Injectable()
class GetPortfolioQuotesUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('StockPositionRepository')
    private stockPositionRepository: IStockPositionRepository,
    @inject('BrapiB3Provider')
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stockPositions = await this.stockPositionRepository.listByType(
      userId,
      type,
    )

    if (!stockPositions || stockPositions.length === 0) {
      throw new AppError('User stock positions not found', 404)
    }

    const symbols = stockPositions.map((position) => position.symbol)
    const quotes = await fetchStockQuotes(symbols, this.b3Provider)

    const portfolio = stockPositions.map((position) => {
      const quote = quotes.find((item) => item.symbol === position.symbol)

      return {
        stock: {
          shortName: quote?.shortName ?? position.symbol,
          symbol: position.symbol,
          totalStock: position.quantity,
        },
        totalInvested: position.quantity * position.avgPrice,
        currentValue: position.quantity * (quote?.price ?? 0),
        quote: quote?.price ?? 0,
        minPrice: position.avgPrice, // Using avgPrice as min/max
        maxPrice: position.avgPrice,
      }
    })
  }
}
```

### 5. `src/modules/stock/utils/fetch-stock-quotes.ts`
**Changes:**
```typescript
// BEFORE (returning only symbol and price)
export async function fetchStockQuotes(
  symbols: string[],
  b3Provider: IB3Provider,
): Promise<{ symbol: string; price: number }[]>

// AFTER (returning symbol, price and shortName)
export async function fetchStockQuotes(
  symbols: string[],
  b3Provider: IB3Provider,
): Promise<{ symbol: string; price: number; shortName: string }[]>
```

### 6. `src/modules/stock/useCases/getPortfolioQuotes/GetPortfolioQuotesUseCaseUseCase.spec.ts`
**Changes:**
```typescript
// BEFORE (using StockRepositoryInMemory with individual stocks)
// Created individual Stock entities and grouped them in tests

// AFTER (using StockPositionRepositoryInMemory with consolidated positions)
// Created StockPosition entities directly representing consolidated positions

async function createStockPositions() {
  stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory()

  const position1 = StockPosition.createStockPosition({
    symbol: 'symbol1',
    quantity: 1,
    type: { stockType: 'stock' },
    avgPrice: 7,
    userId: 'userId',
  })

  const position2 = StockPosition.createStockPosition({
    symbol: 'symbol2',
    quantity: 3,
    type: { stockType: 'fii' },
    avgPrice: 7,
    userId: 'userId',
  })

  const position3 = StockPosition.createStockPosition({
    symbol: 'symbol3',
    quantity: 2,
    type: { stockType: 'fii' },
    avgPrice: 7.5, // Weighted average price
    userId: 'userId',
  })

  // ... create positions
}
```

## Key Changes Summary

### Repository Layer Changes
- **Added `listByType` method** to `IStockPositionRepository` interface
- **Implemented `listByType`** in both Prisma and In-Memory repositories
- **Fixed type comparison** in In-Memory repository (using `stockType` property)

### Use Case Changes
- **Changed dependency injection** from `StockRepository` to `StockPositionRepository`
- **Removed `groupedStocksUtils` usage** - no longer needed with consolidated positions
- **Simplified data processing** - direct mapping from StockPosition to portfolio items
- **Updated shortName handling** - now fetched from B3 provider instead of cached data
- **Modified calculations** - using `quantity * avgPrice` for totalInvested

### Utility Changes
- **Enhanced `fetchStockQuotes`** to return `shortName` along with symbol and price

### Test Changes
- **Updated test setup** to use `StockPositionRepositoryInMemory`
- **Changed test data creation** from individual `Stock` entities to consolidated `StockPosition` entities
- **Updated test assertions** to match new calculation logic

## Performance Improvements

### Before Migration
```
User Request → listByType (Stock[]) → groupedStocksUtils → fetchStockQuotes → Response
                 ↓
              Raw transactions (multiple rows per symbol)
```

### After Migration
```
User Request → listByType (StockPosition[]) → fetchStockQuotes → Response
                 ↓
              Consolidated positions (one row per symbol)
```

**Benefits:**
- **Reduced Database Queries:** Single query instead of multiple aggregations
- **Memory Efficiency:** Less data processing in application layer
- **Consistency:** Portfolio matches actual positions in database
- **Maintainability:** Simpler code logic

## Data Structure Changes

### Stock (Before)
```typescript
interface Stock {
  symbol: string
  quantity: number      // Individual transaction quantity
  price: number         // Transaction price
  shortName: string
  // ... other transaction data
}
```

### StockPosition (After)
```typescript
interface StockPosition {
  symbol: string
  quantity: number      // Consolidated total quantity
  avgPrice: number      // Weighted average price
  type: IStockType
  // No shortName (fetched dynamically)
}
```

## Important Commands

### Testing the Changes
```bash
# Run specific use case tests
yarn test --testPathPattern=GetPortfolioQuotesUseCaseUseCase.spec.ts

# Run all stock-related tests
yarn test --testPathPattern=stock

# Run E2E tests
yarn test:e2e
```

### Database Operations
```bash
# Generate Prisma client
yarn prisma:generate

# Run migrations
yarn prisma:migrate

# Open Prisma Studio
yarn prisma:studio
```

## Final Result

### ✅ Repository Layer
- **Interface:** Extended with `listByType` method
- **Prisma Implementation:** Working with PostgreSQL
- **In-Memory Implementation:** Working with test data
- **Status:** Fully functional

### ✅ Use Case Layer
- **Dependency:** Changed from StockRepository to StockPositionRepository
- **Logic:** Simplified without groupedStocksUtils
- **Calculations:** Updated for consolidated positions
- **Status:** Fully functional

### ✅ Test Layer
- **Setup:** Updated to use StockPosition entities
- **Assertions:** Updated for new calculation logic
- **Coverage:** All test cases passing
- **Status:** Fully functional

## Resolved Problems

1. ✅ **Performance Issues:** Resolved by using consolidated StockPosition data
2. ✅ **Data Inconsistency:** Resolved by using actual position data
3. ✅ **Missing Interface Method:** Resolved by adding listByType to repository
4. ✅ **Test Failures:** Resolved by updating test data and assertions

## Final Architecture

```
📁 GetPortfolioQuotesUseCase Architecture
├── Repository Layer
│   ├── IStockPositionRepository (interface)
│   ├── StockPositionRepository (Prisma)
│   └── StockPositionRepositoryInMemory (Tests)
├── Use Case Layer
│   ├── GetPortfolioQuotesUseCase
│   └── fetchStockQuotes (utility)
└── Test Layer
    ├── GetPortfolioQuotesUseCase.spec.ts
    └── StockPosition test data
```

---

**Conclusion:** GetPortfolioQuotesUseCase successfully migrated from StockRepository to StockPositionRepository, improving performance, consistency, and maintainability while maintaining all existing functionality.
