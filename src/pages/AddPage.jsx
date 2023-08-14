import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx"
import FreelaLogo from "../components/FreelaLogo.jsx"

const viteURL = import.meta.env.VITE_API_URL;

export default function AddPage() {
  const { user } = useContext(UserContext);
  const { token } = user;

  const navigate = useNavigate();

  const url = `${viteURL}/model`;

  const [addModel, setAddModel] = useState({
    name: "",
    picture: "",
    species: "",
    race: "",
    age: "",
    description: "",
    pricePerHour: ""
  });

  function submitForm(event) {
    event.preventDefault();

    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
    }

    const promise = axios.post(url, addModel, config);

    promise.then(r => {
      navigate("/home");
    });
    promise.catch(r => {
      alert(r.response.data);
    });
  };

  return (
    <Container>
      <form onSubmit={submitForm}>
        <FreelaLogo />
        <input
          required
          placeholder="Name"
          type="text"
          value={addModel.name}
          onChange={e => setAddModel({
            name: e.target.value,
            picture: addModel.picture,
            species: addModel.species,
            race: addModel.race,
            age: addModel.age,
            description: addModel.description,
            pricePerHour: addModel.pricePerHour
          })}
        />
        <input 
          required 
          placeholder="Picture" 
          type="text" 
          value={addModel.picture}
          onChange={e => setAddModel({
            name: addModel.name,
            picture: e.target.value,
            species: addModel.species,
            race: addModel.race,
            age: addModel.age,
            description: addModel.description,
            pricePerHour: addModel.pricePerHour
          })}
        />
        <input 
          required 
          placeholder="Species" 
          type="text" 
          value={addModel.species}
          onChange={e => setAddModel({
            name: addModel.name,
            picture: addModel.picture,
            species: e.target.value,
            race: addModel.race,
            age: addModel.age,
            description: addModel.description,
            pricePerHour: addModel.pricePerHour
          })}
        />
        <input 
          required 
          placeholder="Race" 
          type="text" 
          value={addModel.race}
          onChange={e => setAddModel({
            name: addModel.name,
            picture: addModel.picture,
            species: addModel.species,
            race: e.target.value,
            age: addModel.age,
            description: addModel.description,
            pricePerHour: addModel.pricePerHour
          })}
        />
        <input 
          required 
          placeholder="Age" 
          type="text" 
          value={addModel.age}
          onChange={e => setAddModel({
            name: addModel.name,
            picture: addModel.picture,
            species: addModel.species,
            race: addModel.race,
            age: e.target.value,
            description: addModel.description,
            pricePerHour: addModel.pricePerHour
          })}
        />
        <input 
          required 
          placeholder="Description" 
          type="text" 
          value={addModel.description}
          onChange={e => setAddModel({
            name: addModel.name,
            picture: addModel.picture,
            species: addModel.species,
            race: addModel.race,
            age: addModel.age,
            description: e.target.value,
            pricePerHour: addModel.pricePerHour
          })}
        />
        <input 
          required 
          placeholder="Price" 
          type="text" 
          value={addModel.pricePerHour}
          onChange={e => setAddModel({
            name: addModel.name,
            picture: addModel.picture,
            species: addModel.species,
            race: addModel.race,
            age: addModel.age,
            description: addModel.description,
            pricePerHour: e.target.value
          })}
        />
        <button type="submit" data-test="sign-up-submit">Add</button>
      </form>

      <a>
        <Link to="/Home">
          Don't want to add now? Go back Home!
        </Link>  
      </a>
      
    </Container>
  )
}

const Container = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: #75297a;
  }
`
