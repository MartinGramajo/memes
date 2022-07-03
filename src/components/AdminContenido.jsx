import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Image, Modal, Spinner, Table } from "react-bootstrap";
import { leerDeLocalStorage } from "../utils/localStorage";
import FormCrearMeme from "./FormCrearMeme";

export default function AdminContenido(props) {
  const { memes, setMemes, getMemes } = props;
  const [currentMeme, setCurrentMeme] = useState({});
  const handleClose = () => setIsVisible(false);
  const handleShow = () => setIsVisible(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  // función para eliminar meme
  const deleteMeme = async (id) => {
    setIsLoadingDelete(true);
    const tokenLocal = leerDeLocalStorage("token") || {}; // traemos el token para estar autorizado para el borrado.
    const headers = { "x-auth-token": tokenLocal.token }; // lo guardamos en una variable y lo pasamos por parametro a la consulta.
    await axios.delete(`http://localhost:4000/api/memes/${id}`, { headers }); // concatenamos el id a la ruta para seleccionar un meme en particular para borrar.

    // consultamos nuevamente el api para actualizar el listado de memes con el meme borrado.
    await getMemes();
    setIsLoadingDelete(false);
  };

  // funcion para editar meme
  const editMeme = (meme) => {
    handleShow();
    setCurrentMeme(meme);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const updateMeme = { ...currentMeme, [name]: value };
    setCurrentMeme(updateMeme);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsLoadingEdit(true);
    const tokenLocal = leerDeLocalStorage("token") || {};
    const headers = { "x-auth-token": tokenLocal.token };
    await axios.put(
      `http://localhost:4000/api/memes/${currentMeme._id}`,
      currentMeme,
      { headers }
    );
    await getMemes();
    setIsLoadingEdit(false);
    handleClose();
  };

  return (
    <div className="container p-5">
      <FormCrearMeme setMemes={setMemes} />
      <div className="position-relative">
        <Table
          className="mx-auto mt-5 "
          style={{ width: "600px" }}
          striped
          bordered
          hover
        >
          <tbody>
            {memes.length === 0
              ? " No hay memes guardados"
              : memes.map((meme, i) => (
                  <tr key={i}>
                    <td>
                      <img
                        src={meme.imagen}
                        alt=""
                        style={{ width: "5rem" }}
                      ></img>
                    </td>
                    <td>{meme.titulo}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => deleteMeme(meme._id)}
                        variant="none"
                      >
                        {" "}
                        <Image
                          src="https://icongr.am/clarity/eraser.svg?size=26&color=ff0000"
                          alt="icono eliminar"
                        />{" "}
                      </Button>
                      <Button onClick={() => editMeme(meme)} variant="none">
                        {" "}
                        <Image
                          src="https://icongr.am/clarity/edit.svg?size=26&color=currentColor"
                          alt="icono editar"
                        />{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
        {isLoadingDelete && (
          <div
            style={{ backgroundColor: "#00000017" }}
            className="position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        <Modal
          show={isVisible}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Form onSubmit={handleSubmitEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Meme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="titulo">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  required
                  name="titulo"
                  value={currentMeme.titulo} // valor o input controlado.
                  type="text"
                  placeholder="Meme"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="imagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  required
                  name="imagen"
                  value={currentMeme.imagen}
                  type="text"
                  placeholder="http://example.com"
                  onChange={handleChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button type="submit" disable={isLoadingEdit}>
                Guardar Cambios
                {isLoadingEdit && (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
