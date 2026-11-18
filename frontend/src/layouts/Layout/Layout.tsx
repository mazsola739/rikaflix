import { Main, Footer } from 'layouts'
import { Outlet } from 'react-router-dom'
import { PageContainer } from './Layout.styles'

export const Layout = () => {
  return (
    <>
      <PageContainer>
        <Outlet />
        <Main />
      </PageContainer>
      <Footer />
    </>
  )
}
