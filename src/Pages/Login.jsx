import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/style.scss";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Shared/LoginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

function Login() {
  const { updateLoginStatus } = useContext(LoginContext);
  const users = JSON.parse(localStorage.getItem("users"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const showToast = (text, item) => {
    toast[item](text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((user) => user.userName === loginData.username);

    if (user) {
      if (user.password === loginData.password) {
        showToast("login success full", "success");

        updateLoginStatus(true);
        localStorage.setItem("isLogin", true);
        navigate("/home");
      } else {
        showToast("Invalid username or password", "warn");

        updateLoginStatus(false);
      }
    } else {
      updateLoginStatus(false);
      showToast("User not found", "warn");
    }
  };

  return (
    <div className="register-container">
      <div className="register-div rounded">
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="User Name"
              value={loginData.username}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
          <div className="link-text-container mt-3">
            <Link className="link-text" to="/auth/register">
              Does not have an account ?,{" "}
              <span className="link-text-withColor">please register</span>
            </Link>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
