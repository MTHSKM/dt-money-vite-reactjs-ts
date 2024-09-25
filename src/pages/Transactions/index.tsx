import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { DeleteTransaction, NewEditTransactionButton, PriceHighLight, TransactionContainer, TransactionTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { Minus, Pencil } from "phosphor-react";
import { EditTransactionModal } from "./components/EditTransationModel/intex";
import * as Dialog from '@radix-ui/react-dialog'

export function Transactions() {
    const { transactions, deleteTransaction } = useContextSelector(TransactionsContext, (context) => {
        return {
            transactions: context.transactions,
            deleteTransaction: context.deleteTransaction
        }
    })

    async function handleDeleteTransaction(id: string) {
        await deleteTransaction(id)
    }

    return (
        <div>
            <Header></Header>
            <Summary></Summary>

            <TransactionContainer>
                <SearchForm></SearchForm>

                <TransactionTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="35%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight $variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                    <td>
                                        <DeleteTransaction onClick={() => handleDeleteTransaction(transaction.id)}>
                                            <Minus></Minus>
                                        </DeleteTransaction>
                                    </td>
                                    <td>
                                        <Dialog.Root>
                                            <Dialog.Trigger asChild>
                                                <NewEditTransactionButton><Pencil></Pencil></NewEditTransactionButton>
                                            </Dialog.Trigger>

                                            <EditTransactionModal
                                                    id={transaction.id}
                                                    createdAt={transaction.createdAt}
                                                    type={transaction.type}
                                                    description={transaction.description}
                                                    price={transaction.price}
                                                    category={transaction.category}
                                                >
                                                </EditTransactionModal>
                                        </Dialog.Root>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionTable>
            </TransactionContainer>
        </div>
    )
}