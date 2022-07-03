import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { leerDeLocalStorage } from "../utils/localStorage";

export default function FormCrearMeme(props) {
  const { setMemes} = props;
  const [validated, setValidated] = useState(false);
  const [input, setInput] = useState({ titulo: "", imagen: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    const form = event.currentTarget;

    // Chequea que los campos del formulario sean validos.
    if (form.checkValidity() === true) {
      // Forma incorrecta de actualizar un array, mutando un objeto
      // memes.push(input); // esto no hace un nuevo render del component.

      //Forma correcta en react, crear un nuevo array, copiando los elementos previos.
      setIsLoading(true);
      const tokenLocal = leerDeLocalStorage("token") || {};
      const headers = { "x-auth-token": tokenLocal.token };
      await axios.post("http://localhost:4000/api/memes", input, { headers });

      // consultamos nuevamente el api con el meme cargado y setteamos en Memes
      const response = await axios.get("http://localhost:4000/api/memes");
      setMemes(response.data); // setteamos la info de nuestro usuario.

      setIsLoading(false);
      form.reset();
      setValidated(false);
    }
  };

  const handleChange = (e) => {
    // Extraemos y guardamos en variables, el nombre y el valor del input
    // Otra forma de extraerlo
    // const inputHtml = e.target;
    // const name = inputHtml.name;
    // const value = inputHtml.value;

    const { value, name } = e.target;

    // Declaramos un objeto que contiene una copia de las propiedades del state
    // mas el dato nuevo ingresado usando el name y el value del elemento.
    const newInput = { ...input, [name]: value };
    //con ese elemento actualizamos el estado.
    setInput(newInput);
    //Forma simplificada
    //setInput({ ...input, [name]: value });
  };
  return (
    <div>
      {" "}
      <h2 className="mt-5  text-center">Formulario para crear momos</h2>
      <Form
        className="card p-5 m-auto mt-5 form-admin"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            required
            name="titulo"
            type="text"
            placeholder="Meme"
            onChange={handleChange}
          />
          <Form.Control.Feedback>Datos correctos</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor verifica tu comedia.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="imagen">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            required
            name="imagen"
            type="text"
            placeholder="http://example.com"
            onChange={handleChange}
          />
          <Form.Control.Feedback>Comedia aceptada</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Tu comedia no es lo suficientemente prendida para esta App.
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mx-auto" type="submit" disable={isLoading}>
          Crear Meme
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Button>
      </Form>
    </div>
  );
}
