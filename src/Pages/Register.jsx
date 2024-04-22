import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function FormExample() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        userName: formData.userName,
        password: formData.password,
      };

      const newUser = [...users, userData];

      localStorage.setItem("users", JSON.stringify(newUser));
      setUsers(newUser); // Update users state with the new user data
    }

    setValidated(true);

    navigate("/login")
  };

  return (
    <div className="register-container">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="register-div rounded"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={(e) => {
                handleChange("firstName", e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              onChange={(e) => {
                handleChange("lastName", e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomEmail">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email Id"
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              required
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              type="number"
              placeholder="Mobile Number"
              onChange={(e) => {
                handleChange("phone", e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Invalid Mobile Number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(e) => {
                  handleChange("userName", e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={(e) => {
                handleChange("password", e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Confirm Password"
              onChange={(e) => {
                handleChange("confirmPassword", e.target.value);
              }}
              isInvalid={
                validated && formData.password !== formData.confirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              Password not matching.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}

export default FormExample;
