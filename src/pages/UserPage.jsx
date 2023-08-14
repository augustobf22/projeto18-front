import styled from "styled-components"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import { AiFillDelete, AiOutlineReload } from "react-icons/ai";

const viteURL = import.meta.env.VITE_API_URL;

export default function UserPage() {
    const { user } = useContext(UserContext);
    const { token } = user;
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();
    const url = `${viteURL}/user/${id}`;

    useEffect(() => {
        if (user === undefined) {
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

    async function toggleActive(modelId) {
        const verif = confirm("Are you sure you want to change this model status?");
        if (!verif) return alert("The status will stay the same!");

        const urlModel = `${viteURL}/user/${id}/${modelId}`;

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        try {
            await axios.put(urlModel, config);

            alert("Status changed succesfully!");
            navigate("/home");
        } catch (err) {
            alert(err.data);
        }
    }

    async function deleteModel(modelId) {
        const verif = confirm("Are you sure you want to delete this model?");
        if (!verif) return alert("Deletion aborted!");

        const urlModel = `${viteURL}/user/${id}/${modelId}`;

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            await axios.delete(urlModel, config);

            alert("Model deleted succesfully!");
            navigate("/home");
        } catch (err) {
            alert(err.data);
        }
    }

    return (
        <PageContainer>
            <Header />

            <ItemsContainer>

                <Placeholder models={models}>
                    You haven't registered any pets yet!
                </Placeholder>

                <ul>
                    {models.map(m => (
                        <Item key={m.id}>
                            <h1>
                                {m.name}
                            </h1>
                            <h2>
                                Active: {m.isActive ? "Yes" : "No"}
                            </h2>
                            <div>
                                <AiOutlineReload size={30} color={"#75297a"} onClick={() => toggleActive(m.id)} />
                            </div>
                            <div>
                                <AiFillDelete size={30} color={"#75297a"} onClick={() => deleteModel(m.id)} />
                            </div>
                        </Item>
                    )
                    )}
                </ul>
            </ItemsContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
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

const Placeholder = styled.div`
    width: calc(100vw - 150px);
    font-size: 25px;
    color: #75297a;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: ${props => props.models.length === 0 ? "flex" : "none" }; 
`

const Item = styled.li`
  height: 80px;
  width: calc(100vw - 150px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d2f9f6;
  border-radius: 10px;
  gap: 10px;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  h1 {
    font-size: 25px;
    color: #75297a;
  } 
  h2 {
    font-size: 20px;
    color: #75297a;
  }
  div:hover {
    cursor: pointer;
  }
`