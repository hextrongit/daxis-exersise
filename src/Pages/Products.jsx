import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Shared/DataContext";
import Table from "react-bootstrap/Table";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoMdAdd } from "react-icons/io";

function Products() {
  const navigate = useNavigate();
  const {
    loading,
    allProducts,
    allCategories,
    postResponse,
    fetchAllProducts,
    fetchProductsByCategory,
    fetchProductsBySearch,
    fetchAllCategories,
    deleteProduct,
  } = useContext(DataContext);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState([...allProducts]);

  useEffect(() => {
    if (category === "All" && !searchQuery) {
      fetchAllProducts();
      fetchAllCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts[0]?.id]);

  const handleProduct = (product) => {
    navigate(`/productDetails/${product.id}`);
  };

  const handleSelect = (category) => {
    setCategory(category);
    fetchProductsByCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      setTimeout(() => {
        setIsSearch(true);
      }, 1000);
    }

    return () => {
      setIsSearch(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (isSearch) {
      fetchProductsBySearch(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch]);

  const handleAdd = () => {
    navigate("create");
  };

  useEffect(() => {
    if (postResponse && allProducts.length > 0) {
      const existingProduct = allProducts.find(
        (product) => product.id === postResponse.id
      );

      if (existingProduct) {
        const newProducts = allProducts.map((product) => {
          if (product.id === postResponse.id) {
            return postResponse;
          }
          return product;
        });
        setUpdatedProducts(newProducts);
      } else {
        setUpdatedProducts([...allProducts, postResponse]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postResponse, allProducts]);

  const handleEdit = (item) => {
    navigate(`edit/${item.id}`);
  };

  const handleDelete = (item) => {
    const existingProduct = updatedProducts.find(
      (product) => product.id === item.id
    );

    if (existingProduct) {
      const newProducts = updatedProducts.filter(
        (product) => product.id !== existingProduct.id
      );
      setUpdatedProducts(newProducts);

    } else {
      setUpdatedProducts([...allProducts, postResponse]);
    }
    deleteProduct(item);
  };

  return (
    <div className="dashBoard-container">
      <h5 className="heading p-2">Products</h5>
      <div className="container-div p-2">
        <div className="header-container p-2 mb-2 d-flex flex-row">
          {allCategories && allCategories.length > 0 && (
            <div className="category-buttons d-flex flex-row gap-2 rounded">
              <Button
                size="sm"
                variant="secondary"
                className="b"
                onClick={() => handleSelect("All")}
              >
                All
              </Button>
              {allCategories.map((category, i) => (
                <Button
                  size="sm"
                  variant="secondary"
                  key={i}
                  className="b"
                  onClick={() => handleSelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="header-container p-2 mb-2 d-flex flex-row">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Button
            size="sm"
            variant="secondary"
            className="createButton"
            onClick={handleAdd}
          >
            Add <IoMdAdd className="icons" />
          </Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {allProducts.length > 0 ? (
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
                  {updatedProducts.map((product, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
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
                        <FaEdit
                          className="icons"
                          onClick={() => {
                            handleEdit(product);
                          }}
                        />
                      </td>
                      <td>
                        <MdDelete
                          className="icons"
                          onClick={() => {
                            handleDelete(product);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No data found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
