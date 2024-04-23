import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Shared/DataContext";
import Table from "react-bootstrap/Table";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
function Products() {
  const navigate = useNavigate();
  const { loading, allProducts, fetchAllProducts } = useContext(DataContext);
  const [productList, setProductList] = useState([]);
  const [updatedProductList, setUpdatedProductList] = useState(productList);

  useEffect(() => {
    fetchAllProducts();
    if (allProducts && allProducts?.length > 0) {
      setProductList(allProducts);
      setUpdatedProductList(allProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts[0]?.id]);

  const handleProduct = (product) => {
    navigate(`/productDetails/${product.id}`);
  };

  function categorizeProducts(productList) {
    const categories = new Set(productList.map((product) => product.category)); // Get unique categories
    const allProducts = [...productList]; // Copy for "all" category

    return [
      { name: "all", array: allProducts },
      ...Array.from(categories).map((category) => ({
        name: category,
        array: productList.filter((product) => product.category === category),
      })),
    ];
  }

  const categorizedProducts = categorizeProducts(productList);

  const handleSelect = (category) => {
    setUpdatedProductList(category.array);
  };

  return (
    <div className="dashBoard-container">
      <h5 className="heading p-2">Products</h5>
      <div className="container-div p-2">
        <div className="header-container p-2 mb-2">
          {categorizedProducts && categorizedProducts.length > 0 && (
            <div className="d-flex flex-row gap-2">
              {categorizedProducts.map((category, i) => (
                <Button
                  size="sm"
                  variant="secondary"
                  key={i}
                  className="b"
                  onClick={() => handleSelect(category)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {loading && categorizedProducts && categorizedProducts.length > 0 ? (
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
                {updatedProductList.map((product, i) => (
                  <tr key={product.id}>
                    <td>{i+1}</td>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>{product.price}/-</td>
                    <td>
                      <BsFillInfoCircleFill
                        className="icons"
                        onClick={() => {
                          handleProduct(product);
                        }}
                      />
                    </td>
                    <td>
                      <FaEdit className="icons" />
                    </td>
                    <td>
                      <MdDelete className="icons" />
                    </td>
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
