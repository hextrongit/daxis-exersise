import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar.jsx";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Shared/LoginContext.jsx";

const AppRouter = () => {
  const { loginStatus } = useContext(LoginContext);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLogin && loginStatus.status) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus.status]);

  return (
    <div className="main-container">
      <SideBar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AppRouter;