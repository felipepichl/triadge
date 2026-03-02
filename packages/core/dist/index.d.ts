import { AxiosInstance } from 'axios';

interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    withCredentials?: boolean;
}
type SignOut = () => void;
declare function initApiClient(config: ApiClientConfig): AxiosInstance;
declare function getApiClient(): AxiosInstance;
declare function setAccessToken(token: string | null): void;
declare function getAccessToken(): string | null;
declare function registerInterceptorTokenManager(signOut: SignOut): () => void;

type UserDTO = {
    name: string;
    email: string;
};

type CreateFinancialCategoryDTO = {
    description: string;
};
type FinancialCategoryDetailDTO = {
    _id: string;
    description: string;
};
type FinancialCategoryResponseDTO = {
    _id: string;
    props: {
        description: string;
    };
};
type ListTotalSpentByFinancialCategoryResponseDTO = {
    totalExpensesByFinancialCategory: {
        financialCategory: {
            props: {
                description: string;
            };
        };
        totalSpent: number;
    }[];
};
type TotalSpentDTO = {
    financialCategory: string;
    value: number;
};

type CreateTransactionDTO = {
    description: string;
    detail?: string;
    type: string;
    amount: number;
    date?: Date;
    financialCategoryId: string;
    subcategoryId?: string;
};
type BalanceDTO = {
    income: number;
    outcome: number;
    total: number;
};
type TransactionDetailDTO = {
    _id: string;
    description: string;
    type: string;
    amount: number;
    date: Date;
    financialCategory?: FinancialCategoryDetailDTO;
};
type TransactionResponseDTO = {
    transactions: {
        _id: string;
        props: TransactionDetailDTO;
    }[];
    balance: BalanceDTO;
};
type TransactionDTO = {
    transactions: TransactionDetailDTO[];
    balance?: BalanceDTO;
};

type CreateAccountPayableDTO = {
    description: string;
    amount: number;
    dueDate?: Date;
    installments?: number;
    financialCategoryId: string;
    subcategoryId?: string;
};
type AccountPayableDetailDTO = {
    _id: string;
    description: string;
    amount: number;
    isPaid: boolean;
    dueDate: Date;
    paymentDate?: Date;
    isFixed?: boolean;
    installments?: number;
    financialCategoryId?: string;
    subcategoryId?: string;
    financialCategory?: FinancialCategoryDetailDTO;
};
type FixedAccountPayableResponseDTO = {
    fixedAccountsPayable: {
        _id: string;
        props: AccountPayableDetailDTO;
    }[];
    fixedAccountsPayableTotalAmount: number;
};
type FixedAccountPayableDTO = {
    fixedAccountsPayable: AccountPayableDetailDTO[];
    fixedAccountsPayableTotalAmount?: number;
};
type UnfixedAccountPayableResponseDTO = {
    unfixedAccountsPayable: {
        _id: string;
        props: AccountPayableDetailDTO;
    }[];
    unfixedAccountsPayableTotalAmount: number;
};
type UnfixedAccountPayableDTO = {
    unfixedAccountsPayable: AccountPayableDetailDTO[];
    unfixedAccountsPayableTotalAmount?: number;
};
type UnpaidAccountPayableResponseDTO = {
    unpaidAccountsPayable: {
        _id: string;
        props: AccountPayableDetailDTO;
    }[];
    unpaidAccountsPayableTotalAmount: number;
};
type UnpaidAccountPayableDTO = {
    unpaidAccountsPayable: AccountPayableDetailDTO[];
    unpaidAccountsPayableTotalAmount?: number;
};
type PaidAccountPayableResponseDTO = {
    paidAccountsPayable: {
        _id: string;
        props: AccountPayableDetailDTO;
    }[];
    paidAccountsPayableTotalAmount: number;
};
type PaidAccountPayableDTO = {
    paidAccountsPayable: AccountPayableDetailDTO[];
    paidAccountsPayableTotalAmount?: number;
};
type AccountPayableResponseDTO = {
    accountsPayable: {
        _id: string;
        props: AccountPayableDetailDTO;
    }[];
};
type AccountPayableDTO = {
    accountsPayable: AccountPayableDetailDTO[];
};
type MarkAccountPayableAsPaidDTO = {
    accountPayableId: string;
};
type UpdateAmountVariableDTO = {
    amount: number;
    accountPayableId: string;
};
type ListAccountsPayableByDateRangeBody = {
    startDate: string;
    endDate: string;
};
type ListUnpaidAccountsPayableBody = {
    startDate?: string;
    endDate?: string;
};

type CreateSubcategoryDTO = {
    description: string;
    parentCategoryId: string;
};
type SubcategoryDetailDTO = {
    _id: string;
    description: string;
};
type SubcategoryResponseDTO = {
    _id: string;
    props: {
        description: string;
    };
};

type CreateStockDTO = {
    symbol: string;
    price: number;
    date: Date;
    quantity: number;
    type: string;
};
type StockDetailDTO = {
    shortName: string;
    symbol: string;
    totalStock: number;
};
type PortfolioResponseDTO = {
    portfolio: {
        stock: StockDetailDTO;
        totalInvested: number;
        currentValue: number;
        quote: number;
        minPrice: number;
        maxPrice: number;
    }[];
};
type InvestementResponseDTO = {
    totalInvested: number;
    currentValue: number;
    position: number;
};
type BuyStockDTO = {
    symbol: string;
    price: number;
    date: Date;
    quantity: number;
    type: string;
};
type SellStockDTO = {
    symbol: string;
    price: number;
    date?: Date;
    quantity: number;
};

type SignInBody = {
    email: string;
    password: string;
};
type SignInResponse = {
    user: {
        name: string;
        email: string;
    };
    token: string;
};
declare function apiSignIn({ email, password, }: SignInBody): Promise<SignInResponse>;

export { type AccountPayableDTO, type AccountPayableDetailDTO, type AccountPayableResponseDTO, type ApiClientConfig, type BalanceDTO, type BuyStockDTO, type CreateAccountPayableDTO, type CreateFinancialCategoryDTO, type CreateStockDTO, type CreateSubcategoryDTO, type CreateTransactionDTO, type FinancialCategoryDetailDTO, type FinancialCategoryResponseDTO, type FixedAccountPayableDTO, type FixedAccountPayableResponseDTO, type InvestementResponseDTO, type ListAccountsPayableByDateRangeBody, type ListTotalSpentByFinancialCategoryResponseDTO, type ListUnpaidAccountsPayableBody, type MarkAccountPayableAsPaidDTO, type PaidAccountPayableDTO, type PaidAccountPayableResponseDTO, type PortfolioResponseDTO, type SellStockDTO, type SignInBody, type SignInResponse, type SignOut, type StockDetailDTO, type SubcategoryDetailDTO, type SubcategoryResponseDTO, type TotalSpentDTO, type TransactionDTO, type TransactionDetailDTO, type TransactionResponseDTO, type UnfixedAccountPayableDTO, type UnfixedAccountPayableResponseDTO, type UnpaidAccountPayableDTO, type UnpaidAccountPayableResponseDTO, type UpdateAmountVariableDTO, type UserDTO, apiSignIn, getAccessToken, getApiClient, initApiClient, registerInterceptorTokenManager, setAccessToken };
