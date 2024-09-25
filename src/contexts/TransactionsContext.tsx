import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: string,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

interface TransactionContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
    deleteTransaction: (id: string) => Promise<void>
    editTransaction: (data: EditTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

interface CreateTransactionInput {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}

interface EditTransactionInput {
    id: string,
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchTransactions = useCallback(async (query?: string) => {
        const response = await api.get('transactions')

        let data = response.data

        if (query) {
            data = data.filter((transaction: Transaction) =>
                transaction.description.toLowerCase().includes(query.toLowerCase()) ||
                transaction.category.toLowerCase().includes(query.toLowerCase()) ||
                transaction.price === Number(query)
            )
        }

        data = data.sort((a: Transaction, b: Transaction) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setTransactions(data)
    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { description, price, category, type } = data

        const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        setTransactions(state => {

            const updatedTransactions = [...state, response.data]

            return updatedTransactions.sort((a: Transaction, b: Transaction) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        })
    }, [])

    const deleteTransaction = useCallback(async (id: string) => {
        const responseGet = await api.get(`transactions/${id}`)

        if (responseGet) {
            await api.delete(`transactions/${id}`)

            setTransactions(state => 
                state.filter((transaction) => transaction.id !== id)
            )

        } else {
            console.log('Nao Entrada')
        }

    }, [])

    const editTransaction = useCallback(async (data: EditTransactionInput) => {
        const { id, description, price, category, type } = data

        const responseGet = await api.get(`transactions/${id}`)

        if (responseGet) {
            const response = await api.put(`transactions/${id}`, {
                description,
                price,
                category,
                type,
                createdAt: new Date()
            })

            setTransactions(state => {
                const filteredTransactions = state.filter((transaction) => transaction.id !== id)

                const updatedTransactions = [...filteredTransactions, response.data]
    
                return updatedTransactions.sort((a: Transaction, b: Transaction) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
            })
        } else {
            console.log('Nao Entrada')
        }
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction, deleteTransaction, editTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}