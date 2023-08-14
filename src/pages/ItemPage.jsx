import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header.jsx";

const viteURL = import.meta.env.VITE_API_URL;

export default function ItemPage() {
  const { user, setUser } = useContext(UserContext);
  const { user: userObj, token } = user;
  const [model, setModel] = useState({});
  const navigate = useNavigate();

  const id = useParams().id;
  const url = `${viteURL}/model/${id}`;

  useEffect(() => {
   const request = axios.get(url);

   request.then(r => {
     setModel(r.data);
   });

   request.catch(r => {
     alert(r.response.data);
   });
  }, []);

  function logout() {
    localStorage.removeItem("user");
    alert("User logged out!");
    navigate("/signin");
  };

  return (
    <PageContainer>
      <Header />

      <ItemContainer>
        <img src={model.picture} alt="pet picture" />
        <Info>
            <h1>Name: {model.name} </h1>
            <h1>Species: {model.species} </h1>
            <h1>Race: {model.race} </h1>
            <h1>Age: {model.age} </h1>
            <h1>Description: {model.description}</h1>
            <h2>Price: {Number(model.pricePerDay).toLocaleString("en-US", {style:"currency", currency:"USD"})} </h2>
        </Info>
      </ItemContainer>

    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`

const ItemContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
    border: 1px solid black;
    box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
    margin-bottom: 15px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  h1 {
    font-size: 25px;
    color: #75297a;
  } 
  h2 {
    font-size: 30px;
    color: #75297a;
    text-align: center;
  }
`