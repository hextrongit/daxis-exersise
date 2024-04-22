import { createContext, useState } from "react";

export const LoginContext = createContext({
  loginData: {
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
    status: false,
  },
  updateLoginStatus: () => {},
  updateUser: () => {},
});

// eslint-disable-next-line react/prop-types
function LoginStateProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState({
    status: false,
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
    },
  });

  const updateLoginStatus = (status) => {
    setLoginStatus((prevData) => ({ ...prevData, status: status }));
  };

  const updateUser = (user) => {
    setLoginStatus((prevData) => ({ ...prevData, userData: user }));
  };

  const value = { loginStatus, updateLoginStatus, updateUser };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default LoginStateProvider;