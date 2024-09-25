import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './style'
import { TransactionsContext, } from '../../../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface Transaction extends NewTransactionFormInputs {
    id: string
    createdAt: string
}

export function EditTransactionModal(transaction: Transaction) {
    const editTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.editTransaction
    })

    const {
        control,
        register,
        handleSubmit,
        formState: {
            isSubmitting
        },
        reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            description: transaction.description,
            price: transaction.price,
            category: transaction.category,
            type: transaction.type
        }
    })


    async function handleEditTransaction(data: NewTransactionFormInputs) {
        const { category, description, price, type } = data

        const { id } = transaction

        const newTransactionEdited = {
            category,
            description,
            price,
            type,
            id
        }

        await editTransaction(newTransactionEdited)

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay></Overlay>

            <Content>
                <Dialog.Title>Editar Transação</Dialog.Title>

                <CloseButton>
                    <X size={24}></X>
                </CloseButton>

                <form action="" onSubmit={handleSubmit(handleEditTransaction)}>
                    <input
                        type='text'
                        placeholder={transaction.description}
                        required
                        {...register('description')}
                    ></input>
                    <input
                        type='number'
                        placeholder={`${transaction.price}`}
                        required
                        {...register('price', { valueAsNumber: true })}
                    ></input>
                    <input
                        type='text'
                        placeholder={transaction.category}
                        required
                        {...register('category')}
                    ></input>

                    <Controller
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton $variant='income' value='income'>
                                        <ArrowCircleUp size={24}></ArrowCircleUp>
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton $variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24}></ArrowCircleDown>
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    ></Controller>

                    <button type='submit' disabled={isSubmitting}>Editar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}