import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import FreelaLogo from "../components/FreelaLogo"

const viteURL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
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

  function logout() {
     localStorage.removeItem("user");
     alert("User logged out!");
     navigate("/signin");
  }

  return (
    <HomeContainer>
      <Header>
        <FreelaLogo />
        <BiExit onClick={logout} data-test="logout"/>
      </Header>

      <ItemsContainer>
        <ul>
          {models.map(m => (
            <Item key={m._id}>
              <img src={m.picture} alt="pet picture" />
              <Info>
                <a>
                  Name: {m.name}
                </a>
                <a>
                  Species: {m.species}
                </a>
                <a>
                  Race: {m.race}
                </a>
                <a>
                  Age: {m.age}
                </a>
                <a>
                  Description: {m.description}
                </a>
                <a>
                  Price: {m.pricePerDay}
                </a>
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
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: #75297a;
`
const ItemsContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Item = styled.li`
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d2f9f6;
  border: 1px solid black;
  gap: 10px;

  img {
    border-radius: 150px;
    border: 1px solid black;
    width: 250px;
    object-fit: contain;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  a {
    color: #75297a;
  } 
`