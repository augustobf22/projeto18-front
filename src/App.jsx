import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ItemPage from "./pages/ItemPage"
import UserPage from "./pages/UserPage"
import AddPage from "./pages/AddPage"
import UserProvider from "./contexts/UserContext.jsx"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/model/:id" element={<ItemPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/model" element={<AddPage />} />
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
