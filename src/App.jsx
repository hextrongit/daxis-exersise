import { Outlet } from "react-router-dom";
import LoginStateProvider from "./Shared/LoginContext";
import DataProvider from "./Shared/DataContext";

function App() {
  return (
    <>
      <LoginStateProvider>
        <DataProvider>
          <Outlet />
        </DataProvider>
      </LoginStateProvider>
    </>
  );
}

export default App;
