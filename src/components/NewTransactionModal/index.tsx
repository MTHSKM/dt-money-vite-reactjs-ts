import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const createTransaction = useContextSelector(TransactionsContext, (contexto) => {
        return contexto.createTransaction
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
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransation(data: NewTransactionFormInputs) {
        await createTransaction(data)

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay></Overlay>

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24}></X>
                </CloseButton>

                <form action="" onSubmit={handleSubmit(handleCreateNewTransation)}>
                    <input
                        type='text'
                        placeholder='Descrição'
                        required
                        {...register('description')}
                    ></input>
                    <input
                        type='number'
                        placeholder='Preço'
                        required
                        {...register('price', { valueAsNumber: true })}
                    ></input>
                    <input
                        type='text'
                        placeholder='Categoria'
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

                    <button type='submit' disabled={isSubmitting}>Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}