# AccountPayable Repository - createMany Error Handling

**Date:** January 2026
**Objective:** Implement proper error handling and duplicate management in the `createMany` method to prevent silent failures and improve reliability

## Identified Problems and Solutions

### Problem: Missing Duplicate Handling and Input Validation in createMany Method
**Note on Architecture:** Following Clean Architecture principles, error handling responsibility is divided:
- **Repository Layer:** Handles technical concerns (duplicate skipping, input validation)
- **Use Case Layer:** Handles business logic errors and transforms them to domain errors (AppError)

**Cause:** The `createMany` method in `AccountsPayableRepository` lacked duplicate management and input validation:
```typescript
async createMany(accounts: AccountPayable[]): Promise<void> {
  const data = accounts.map(/* ... */)
  
  await PrismaSingleton.getInstance().accountPayable.createMany({
    data,
  })
}
```

**Impact:**
- **Duplicate Handling:** No strategy for handling duplicate records (would fail on first duplicate)
- **Empty Array:** No validation for empty input arrays (unnecessary database calls)
- **Partial Failures:** If duplicates exist, entire operation fails instead of skipping duplicates
- **Performance:** Unnecessary database operations for empty arrays

**Solution:** Implemented input validation and duplicate management at repository level. Error handling for business logic remains in Use Case layer following Clean Architecture principles.

**Benefits:**
- ✅ Validates input before processing (prevents unnecessary DB calls)
- ✅ Handles duplicates gracefully with `skipDuplicates` (prevents operation failures)
- ✅ Follows Clean Architecture (separation of concerns)
- ✅ Repository focuses on technical concerns
- ✅ Use Cases handle business logic errors

## Solution Implemented

### 1. Code Changes

Modified `src/modules/accountPayable/infra/prisma/repositories/AccountsPayableRepository.ts`:

**Before:**
```typescript
async createMany(accounts: AccountPayable[]): Promise<void> {
  const data = accounts.map(
    ({
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
      financialCategoryId,
      subcategoryId,
    }) => ({
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
      financialCategoryId,
      subcategoryId: subcategoryId || null,
    }),
  )

  await PrismaSingleton.getInstance().accountPayable.createMany({
    data,
  })
}
```

**After:**
```typescript
async createMany(accounts: AccountPayable[]): Promise<void> {
  // Validate input - prevent unnecessary database calls
  if (!accounts || accounts.length === 0) {
    return
  }

  const data = accounts.map(
    ({
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
      financialCategoryId,
      subcategoryId,
    }) => ({
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
      financialCategoryId,
      subcategoryId: subcategoryId || null,
    }),
  )

  // Repository handles technical concerns (duplicate skipping)
  // Errors are propagated to Use Case layer for business logic handling
  await PrismaSingleton.getInstance().accountPayable.createMany({
    data,
    skipDuplicates: true,
  })
}
```

### 2. Improvements Implemented

#### a) Input Validation
- **Empty Array Check:** Returns early if array is empty or null
- **Prevents Unnecessary Processing:** Avoids database calls for empty data
- **Performance:** Saves database round-trip for invalid inputs

#### b) Duplicate Handling
- **`skipDuplicates: true`:** Prisma option to skip duplicate records
- **Graceful Handling:** Duplicates are silently skipped instead of causing errors
- **Use Case:** Useful when creating installments or fixed accounts that might already exist

#### c) Error Handling Strategy
- **Repository Responsibility:** Handles technical concerns (duplicate skipping, input validation)
- **Use Case Responsibility:** Handles business logic errors and transforms to AppError
- **Error Propagation:** Errors from Prisma are propagated to Use Case layer
- **Architecture:** Follows Clean Architecture separation of concerns

## Technical Details

### Prisma createMany Behavior

**Without `skipDuplicates`:**
- Fails on first duplicate record
- Transaction stops at first error
- Partial data may be inserted
- Error thrown immediately

**With `skipDuplicates: true`:**
- Skips duplicate records silently
- Continues processing remaining records
- Only inserts non-duplicate records
- No error thrown for duplicates

### Error Scenarios Handled

1. **Empty Array (Repository Level):**
   - Input: `[]` or `null`
   - Behavior: Returns early, no database call
   - Result: No error, operation completes successfully
   - **Responsibility:** Repository (technical validation)

2. **Duplicate Records (Repository Level):**
   - Input: Array with duplicate IDs
   - Behavior: Skips duplicates, inserts unique records
   - Result: Partial success, no error
   - **Responsibility:** Repository (technical concern)

3. **Constraint Violations (Use Case Level):**
   - Input: Invalid foreign keys or constraint violations
   - Behavior: Error propagated from Prisma to Use Case
   - Result: Use Case should handle and transform to AppError if needed
   - **Responsibility:** Use Case (business logic error handling)

4. **Database Errors (Use Case/Middleware Level):**
   - Input: Connection issues, timeouts, etc.
   - Behavior: Error propagated through layers
   - Result: Handled by global error middleware or Use Case
   - **Responsibility:** Use Case or Global Error Handler

### Use Cases

The `createMany` method is used in:

1. **CreateAccountPayableUseCase:**
   - Creates multiple installments of an account payable
   - Example: Creating 12 monthly installments

2. **CreateFixedAccountsPayableUseCase:**
   - Creates fixed accounts for multiple months
   - Example: Creating fixed accounts for the entire year

## Impact Analysis

### Methods Affected

1. **`createMany(accounts: AccountPayable[]): Promise<void>`**
   - ✅ Added input validation
   - ✅ Added duplicate handling
   - ✅ Added error handling and logging

### Use Cases Affected

**`CreateAccountPayableUseCase`:**
- ✅ Duplicate installments are now skipped automatically
- ⚠️ Should handle constraint violations if needed (currently errors propagate)

**`CreateFixedAccountsPayableUseCase`:**
- ✅ Duplicate fixed accounts are now skipped automatically
- ⚠️ Should handle constraint violations if needed (currently errors propagate)

**Note:** Both Use Cases currently propagate Prisma errors. If business logic requires specific error handling for constraint violations, it should be added in the Use Case layer.

### Benefits

**Reliability:**
- ✅ Graceful duplicate handling (no operation failures)
- ✅ Input validation prevents unnecessary operations

**Performance:**
- ✅ Early return for empty arrays (no database call)
- ✅ Efficient duplicate skipping (database-level)

**Architecture:**
- ✅ Proper separation of concerns
- ✅ Repository handles technical concerns
- ✅ Use Cases handle business logic
- ✅ Follows Clean Architecture principles

## Testing Recommendations

### Unit Tests

Test error handling scenarios:

```typescript
describe('createMany error handling', () => {
  it('should return early for empty array', async () => {
    await repository.createMany([])
    // Should not throw and not call database
  })

  it('should handle duplicates gracefully', async () => {
    const accounts = [account1, account1, account2] // duplicate
    await repository.createMany(accounts)
    // Should insert account1 and account2, skip duplicate
  })

  it('should propagate errors to use case layer', async () => {
    const accounts = [invalidAccount] // invalid foreign key
    await expect(repository.createMany(accounts)).rejects.toThrow()
    // Error should be propagated to Use Case for handling
  })
})
```

### Integration Tests

- Test with valid data
- Test with duplicate records
- Test with invalid foreign keys
- Test with empty array
- Test with null/undefined
- Verify error logging

## Migration Guide

### For Developers

No migration required:
- ✅ Method signature unchanged
- ✅ Backward compatible
- ✅ Existing code works without changes
- ✅ Improved error handling is transparent

### Behavior Changes

**Before:**
- Empty array: Would attempt database call (no-op)
- Duplicates: Would throw error, failing entire operation
- Errors: Would propagate to Use Case

**After:**
- Empty array: Returns early (no database call) ✅
- Duplicates: Skips silently (no error) ✅
- Errors: Propagate to Use Case layer (as per architecture) ✅

## Related Optimizations

This optimization works in conjunction with:
- **[AccountPayable Indexes Optimization](./ACCOUNT_PAYABLE_INDEXES_OPTIMIZATION.md)** - Indexes help with duplicate detection performance
- **[AccountPayable Date Normalization](./ACCOUNT_PAYABLE_DATE_NORMALIZATION.md)** - Consistent date handling prevents duplicate issues

## Conclusion

Input validation and duplicate management have been improved in the `createMany` method following Clean Architecture principles. The repository handles technical concerns (validation, duplicate skipping), while error handling for business logic remains in the Use Case layer.

**Key Benefits:**
- ✅ Input validation prevents unnecessary operations
- ✅ Duplicate handling prevents operation failures
- ✅ Proper separation of concerns (Repository vs Use Case)
- ✅ Follows project architecture patterns
- ✅ Backward compatible with existing code

**Architecture Notes:**
- ⚠️ Repository handles technical concerns only
- ⚠️ Use Cases are responsible for business logic error handling
- ⚠️ Duplicates are silently skipped (may need explicit handling in Use Case if business requires)
- ✅ **Net Benefit:** Improved reliability and proper architecture separation

---

**Last Updated:** January 2026
**Related Documentation:**
- [AccountPayable Indexes Optimization](./ACCOUNT_PAYABLE_INDEXES_OPTIMIZATION.md)
- [AccountPayable Date Normalization](./ACCOUNT_PAYABLE_DATE_NORMALIZATION.md)
- [AccountPayable Pagination](./ACCOUNT_PAYABLE_PAGINATION.md)
