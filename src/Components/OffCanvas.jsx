import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { DataContext } from "../Shared/DataContext";
import { useNavigate, useParams } from "react-router-dom";


function OffcanvasComponent() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    loading,
    productDetails,
    fetchProductDetails,
    postProduct,
    editProduct,
  } = useContext(DataContext);

  const [data, setData] = useState({
    loading: false,
    status: "",
    show: false,
    id: "",
    title: "",
    description: "",
    price: null,
    discountPercentage: null,
    rating: null,
    stock: null,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  const handleData = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (params.id) {
      fetchProductDetails(params.id);
      setData({
        id: productDetails.id,
        title: productDetails.title,
        description: productDetails.description,
        price: productDetails.price,
        discountPercentage: productDetails.discountPercentage,
        rating: productDetails.rating,
        stock: productDetails.stock,
        brand: productDetails.brand,
        category: productDetails.category,
        thumbnail: productDetails.thumbnail,
        images: productDetails.images,
      });
    }

    return () => {
      setData({
        id: null,
        title: "",
        description: "",
        price: null,
        discountPercentage: null,
        rating: null,
        stock: null,
        brand: "",
        category: "",
        thumbnail: "",
        images: [],
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, productDetails.id]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const productData = {
        id: data.id ? data.id : "",
        title: data.title,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        brand: data.brand,
        category: data.category,
        thumbnail: data.thumbnail,
        images: data.images,
      };
      if (data.id) {
        editProduct(productData, data.id);
      } else {
        postProduct(productData);
      }
    }

    setValidated(true);
  };

  const handleClose = () => {
    navigate("/products");
  };

  return (
    <>
      <Offcanvas show={true} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {data.id ? "Edit Product" : "Add Product"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="product-update-div rounded"
          >
            <Row className="d-flex flex-column mb-3">
              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  value={data.title}
                  onChange={(e) => {
                    handleData("title", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={data.brand}
                  placeholder="Brand"
                  onChange={(e) => {
                    handleData("brand", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={data.category}
                  placeholder="Category"
                  onChange={(e) => {
                    handleData("category", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={data.description}
                  placeholder="Description"
                  onChange={(e) => {
                    handleData("description", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Price</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={data.price}
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                      handleData("price", e.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustomPassword"
              >
                <Form.Label>Discount Percentage</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={data.discountPercentage}
                  placeholder="Discount Percentage"
                  onChange={(e) => {
                    handleData("discountPercentage", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={data.rating}
                  placeholder="Rating"
                  onChange={(e) => {
                    handleData("rating", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="w-100"
                as={Col}
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={data.stock}
                  placeholder="Stock"
                  onChange={(e) => {
                    handleData("stock", e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Button variant="secondary" disabled={loading} type="submit">
              {loading ? "Loading…" : data.id ? "Update" : "Add"}
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasComponent;
