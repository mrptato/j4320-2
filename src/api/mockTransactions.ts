import transactionsData from '../mock-transactions.json'

export type Transaction = {
    transactionID: number;
    date: string;
    description: string;
    amount: number;
}

export const fetchTransactions = (): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.9) {
                resolve(transactionsData.transactions)
            } else{
                reject (new Error("Failed to fetch transaction"))
            }
        })
    })
}