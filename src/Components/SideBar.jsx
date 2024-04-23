import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button"
import { Link, useNavigate } from "react-router-dom"
import { LoginContext } from "../Shared/LoginContext";

function SideBar() {
  const navigate = useNavigate();
  const [navItem, setNavItem] = useState("")

const { updateLoginStatus } = useContext(LoginContext);

  const handleLogout =()=> {
    updateLoginStatus(false)
    localStorage.setItem("isLogin", false)
    navigate("/auth/login");
  }

  return (
    <div className="sideBar-div d-flex flex-column flex-shrink-0 p-3 bg-light">
      <Link to={"/"} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span className="fs-4 mb-2 main-heading">Daxis</span>
      </Link>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
        <Link to={"/"} className={"nav-link" + (navItem === "dashBoard" ? " active" : "")} onClick={() => setNavItem("dashBoard")}>Dash Board</Link>
          <Link to={"products"} className={"nav-link" + (navItem === "products" ? " active" : "")} onClick={()=> setNavItem("products")}>Products</Link>
          <Link to={"profile"} className={"nav-link" + (navItem === "profile" ? " active" : "")} onClick={()=> setNavItem("profile")}>Profile</Link>

          <div>
            <Button variant="secondary" onClick={()=> {handleLogout()}}>Logout</Button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default SideBar