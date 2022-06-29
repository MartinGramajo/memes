import axios from "axios";
import { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { guardarEnLocalStorage } from "../utils/localStorage";


export default function FormLogin({ setUser }) {
  const [validated, setValidated] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate(); //el equivalente de useHistory en react-router-dom v6

  const handleChange = (event) => {
    const { value, name } = event.target;
    const newInput = { ...input, [name]: value };
    setInput(newInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    const form = event.currentTarget;

    // chequea que los campos del formulario sean validos.
    if (form.checkValidity() === true) {
      try {
        // Consultar a el back a la ruta /Login, con el usuario y contraseña.
        const response = await axios.post(
          "http://localhost:4000/api/auth/login",
          input
        );
        // guardamos los datos del response en una variable (desestructuramos)
        const {token, name, register} = response.data;
        //guardamos el token en el localstorage
        guardarEnLocalStorage({ key: "token", value: { token } });
        alert("bienvenido " + name + " " + register);
        //Navigate redirecciona a la pantalla indicada en el paramentro.
        navigate("/");
      } catch (error) {
        console.log(error);
        // Con esta condición traemos los datos de los check/validaciones
        // para darle un msj mas exacto del error al usuario.
        if (error.response.data) {
          alert(JSON.stringify(error.response.data));
        } else {
          alert("Error de conexion");
        }
      }
    }
  };

  return (
    <Form
      className="mx-auto card mt-5"
      style={{ width: "600px" }}
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <Form.Group controlId="validationCustom01">
          <Form.Label className="p-2">Email</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="email@email"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor verifica tus datos.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label className="p-2">Password</Form.Label>
          <Form.Control
            required
            minLength="6"
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="******"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor verifica tus datos.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="mx-auto mt-4" type="submit">
        Iniciar Sesión{" "}
      </Button>
    </Form>
  );
}
