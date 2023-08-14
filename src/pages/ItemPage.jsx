import styled from "styled-components"
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

  return (
    <PageContainer>
      <Header />

      <ItemContainer>
        <img src={model.picture} alt="pet picture" />
        <InfoContainer>
          <Info>
            <h1>Name: {model.name} </h1>
            <h1>Species: {model.species} </h1>
            <h1>Race: {model.race} </h1>
            <h1>Age: {model.age} </h1>
            <h1>Description: {model.description}</h1>
            <h2>Price: {Number(model.pricePerHour).toLocaleString("en-US", {style:"currency", currency:"USD"})} </h2>
          </Info>
          <Info>
            <h2>Owner Info</h2>
            <h2>Phone: {model.phone}</h2>
            <h2>E-mail: {model.email}</h2>
          </Info>
        </InfoContainer>
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

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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