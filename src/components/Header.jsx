import styled from "styled-components"
import FreelaLogo from "./FreelaLogo"
import { BiExit } from "react-icons/bi"
import { AiOutlineMenu } from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

export default function Header() {
    const { user } = useContext(UserContext);
    const { userId } = user;
    const navigate = useNavigate();
    const [bar, setBar] = useState("none");

    function logout() {
        const verif = confirm("Do you want to log out?");
        if(verif) {
            localStorage.removeItem("user");
            alert("User logged out!");
            navigate("/signin");
        }
    };

    function toggleSideBar() {
        (bar === "none") ? setBar("flex") : setBar("none");
    };
    
    return (
        <>
            <Head>
                <MenuContainer bar={bar}>
                    <AiOutlineMenu onClick={toggleSideBar}/>
                </MenuContainer>
                <div>
                    <Link to="/home">
                        <FreelaLogo />
                    </Link>
                </div>
                <div>
                    <BiExit onClick={logout}/>
                </div>
            </Head>
            <Sidebar bar={bar}>
                <Link to={`/user/${userId}`}>
                    <h1>
                        Manage my pets
                    </h1>
                </Link>
                <Link to={"/model"}>
                    <h1>Add a pet</h1>
                </Link>
            </Sidebar>
        </>
    )
}

const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: #75297a;

  div {
    cursor: pointer;
  }
`
const MenuContainer = styled.div`
    z-index: 2;
    cursor: pointer;
    color: ${props => props.bar === "none" ? "#75297a" : "#9df1eb"}
`

const Sidebar = styled.div`
    width: 300px;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    display: ${props => props.bar};
    z-index: 1;
    background-color: #75297a;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 70px 0 0 25px;

    h1 {
        padding: 10px;
        &:hover{
            cursor: pointer;
            background-color: #9df1eb;
            color: #75297a;
        }
    }
`