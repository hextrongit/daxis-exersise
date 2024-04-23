import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/Styles/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRouter from "./Routers/AppRouter.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import AuthRouter from "./Routers/AuthRouter.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Profile from "./Pages/Profile.jsx";
import OffcanvasComponent from "./Components/OffCanvas.jsx";
import ProductRouter from "./Routers/ProductRouter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "*",
        element: <AppRouter />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: "products",
            element: <ProductRouter />,
            children: [
              { path: "create", element: <OffcanvasComponent placement={"end"}/> },
              { path: "edit/:id", element: <OffcanvasComponent placement={"end"}/> },
            ],
          },
          { path: "productDetails/:id", element: <ProductDetails /> },
          { path: "profile", element: <Profile /> },
        ],
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth",
        element: <AuthRouter />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
