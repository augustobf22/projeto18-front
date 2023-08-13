import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionsPage"
import UserProvider from "./contexts/UserContext.jsx"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </UserProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #fff563;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
