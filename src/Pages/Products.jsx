import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Shared/DataContext";
import Table from "react-bootstrap/Table";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Products() {
  const navigate = useNavigate()
  const { loading, allProducts, fetchAllProducts } = useContext(DataContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchAllProducts();
    if (allProducts && allProducts?.length > 0) {
      setProductList(allProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts[0]?.id]);

  const handleProduct = (product) => {
    navigate(`/productDetails/${product.id}`);
  };

  return (
    <div className="dashBoard-container">
      <h5 className="heading p-2">Products</h5>
      <div className="container-div p-2">

        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Info</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>{product.price}/-</td>
                    <td><BsFillInfoCircleFill className="icons" onClick={()=> {handleProduct(product)}}/></td>
                    <td><FaEdit className="icons"/></td>
                    <td><MdDelete className="icons"/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
