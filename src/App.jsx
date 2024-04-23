import { Outlet } from "react-router-dom";
import LoginStateProvider from "./Shared/LoginContext";
import DataProvider from "./Shared/DataContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <LoginStateProvider>
        <DataProvider>
          <ToastContainer />
          <Outlet />
        </DataProvider>
      </LoginStateProvider>
    </>
  );
}

export default App;
