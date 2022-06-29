import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newInput = { ...input, [name]: value };
    setInput(newInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost:4000/api/auth/register", input)
        alert('Registro exitoso')
        navigate("/Login");
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={8} md={6} className=" mx-auto my-5">
          {/* {<Alert variant="danger">{"correo en uso"}</Alert>} */}
          <Card className="border">
            <Card.Header className="bg-info">
              <h4 className="text-white"> Registro</h4>
            </Card.Header>
            <Card.Body>
              <Form  onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>nombre</Form.Label>
                    <Form.Control
                      required
                      onChange={handleChange}
                      type="text"
                      placeholder="name"
                      name="name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      required
                      onChange={handleChange}
                      type="email"
                      placeholder="email"
                      name="email"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      minLength="6"
                      onChange={handleChange}
                      name="password"
                      placeholder="******"
                      type="text"
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group as={Col} md="12" controlId="validationCustom05">
                    <Form.Label>role</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="role"
                      name="role"
                    />
                  </Form.Group> */}
                </Row>
                <Row>
                  <Button type="submit" className="mx-auto mt-4">
                    Iniciar Sesión
                  </Button>
                </Row>
                <Row>
                  <Link className="mx-auto mt-2" to="/login">
                    ¿ Ya tienes una cuenta? Iniciar sesión
                  </Link>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
