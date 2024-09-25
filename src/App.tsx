import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions";
import { TransactionsProvider } from "./contexts/TransactionsContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle></GlobalStyle>
      <TransactionsProvider>
        <Transactions></Transactions>
      </TransactionsProvider>
    </ThemeProvider>
  )
}