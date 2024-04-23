import { Outlet } from "react-router-dom";
import Products from "../Pages/Products";

const ProductRouter = () => {
  return (
    <>
      <div >
        <Products />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProductRouter;
