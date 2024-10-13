import { StyledApp } from "./App.styles"
import { Footer, Header, Main } from "./components"
import { StoreProvider, ThemeProvider } from "./providers"
import { theme } from "./styles"


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <StyledApp>
          <Header />
          <Main />
          <Footer />
        </StyledApp>
      </StoreProvider>
    </ThemeProvider>
  )
}
