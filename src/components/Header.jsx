import styled from "styled-components"
import FreelaLogo from "./FreelaLogo"
import { BiExit } from "react-icons/bi"
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("user");
        alert("User logged out!");
        navigate("/signin");
    };

    function goHome() {
        navigate("/home");
    };
    
    return (
        <Head>
            <div>
                <FreelaLogo onClick={goHome}/>
            </div>
            <div>
                <BiExit onClick={logout}/>
            </div>
        </Head>
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