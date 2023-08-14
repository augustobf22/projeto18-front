import styled from "styled-components"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";

const viteURL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { user } = useContext(UserContext);
  const { user: userObj, token } = user;
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const url = `${viteURL}/home`;

  useEffect(() => {
     if(user===undefined){
      alert("You need to log in!");
      navigate("/signin");
    };

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const request = axios.get(url, config);

    request.then(r => {
      setModels(r.data);
    });

    request.catch(r => {
      alert(r.response.data);
    });
  }, []);

  function openItem(item) {
    navigate(`/model/${item.id}`);
  };

  return (
    <HomeContainer>
      <Header />

      <ItemsContainer>
        <ul>
          {models.map(m => (
            <Item key={m.id} onClick={() => openItem(m)}>
              <img src={m.picture} alt="pet picture" />
              <Info>
                <h1>
                  Name: {m.name}
                </h1>
                <h2>
                  Price: {Number(m.pricePerHour).toLocaleString("en-US", {style:"currency", currency:"USD"})} /hour
                </h2>
              </Info>
            </Item>
          )
          )}
        </ul>
      </ItemsContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`

const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Item = styled.li`
  height: 120px;
  width: calc(100vw - 150px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #d2f9f6;
  border-radius: 10px;
  gap: 10px;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    opacity: 0.8;
  };

  img {
    border-radius: 50%;
    border: 1px solid black;
    width: 100px;
    height: 100px;
    object-fit: cover;
  };
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  h1 {
    font-size: 25px;
    color: #75297a;
  } 
  h2 {
    font-size: 20px;
    color: #75297a;
  }
`