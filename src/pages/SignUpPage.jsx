import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import FreelaLogo from "../components/FreelaLogo"
import axios from "axios";
import { useState } from "react";

const viteURL = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
  const navigate = useNavigate();

  const url = `${viteURL}/signup`;

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    phone: "",
    picture: "",
    password: "",
    confirmPassword: ""
  });

  function submitForm(event) {
    event.preventDefault();

    const promise = axios.post(url, signUp);

    promise.then(r => {
      navigate("/signin");
    });
    promise.catch(r => {
      alert(r.response.data);
    });
  };

  return (
    <SignUpContainer>
      <form onSubmit={submitForm}>
        <FreelaLogo />
        <input
          required
          placeholder="Name"
          type="text"
          value={signUp.name}
          onChange={e => setSignUp({
            name: e.target.value,
            email: signUp.email,
            phone: signUp.phone,
            picture: signUp.picture,
            password: signUp.password,
            confirmPassword: signUp.confirmPassword
          })}
        />
        <input 
          required 
          placeholder="E-mail" 
          type="email" 
          value={signUp.email}
          onChange={e => setSignUp({
            name: signUp.name,
            email: e.target.value,
            phone: signUp.phone,
            picture: signUp.picture,
            password: signUp.password,
            confirmPassword: signUp.confirmPassword
          })}
        />
        <input 
          required 
          placeholder="Phone" 
          type="text" 
          value={signUp.phone}
          onChange={e => setSignUp({
            name: signUp.name,
            email: signUp.email,
            phone: e.target.value,
            picture: signUp.picture,
            password: signUp.password,
            confirmPassword: signUp.confirmPassword
          })}
        />
         <input 
          required 
          placeholder="Picture" 
          type="text" 
          value={signUp.picture}
          onChange={e => setSignUp({
            name: signUp.name,
            email: signUp.email,
            phone: signUp.phone,
            picture: e.target.value,
            password: signUp.password,
            confirmPassword: signUp.confirmPassword
          })}
        />
        <input 
          required 
          placeholder="Password" 
          type="password" 
          value={signUp.password}
          onChange={e => setSignUp({
            name:signUp.name,
            email: signUp.email,
            phone: signUp.phone,
            picture: signUp.picture,
            password: e.target.value,
            confirmPassword: signUp.confirmPassword
          })}
        />
        <input 
          required 
          placeholder="Confirm password" 
          type="password" 
          value={signUp.confirmPassword}
          onChange={e => setSignUp({
            name:signUp.name,
            email: signUp.email,
            phone: signUp.phone,
            picture: signUp.picture,
            password: signUp.password,
            confirmPassword: e.target.value
          })}
        />
        <button type="submit" data-test="sign-up-submit">Register</button>
      </form>

      <a>
        <Link to="/signin">
          Already have an account? Log in now!
        </Link>  
      </a>
      
    </SignUpContainer>
  )
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: #75297a;
  }
`
