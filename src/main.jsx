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
import Products from "./Pages/Products.jsx";
import Profile from "./Pages/Profile.jsx";

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
          { path: "products", element: <Products /> },
          { path: "productDetails/:id", element: <ProductDetails /> },
          { path: "profile", element: <Profile /> },
        ],
      },
      {
        path: "/auth",
        element: <AuthRouter />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
