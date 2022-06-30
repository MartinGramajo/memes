import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { leerDeLocalStorage } from "../utils/localStorage";

export default function NavReact({ user }) {
  const tokenLocal = leerDeLocalStorage("token") || {};
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token"); // remueve el item token del usuario.
    navigate("/Login"); // Para evitar el 404 si nos deja en la ruta /admin.
    window.location.reload(); // recargar la pagina para borrar todos los estados.
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Memes
            </Nav.Link>
            {!tokenLocal.token && (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/perfil">
              Perfil
            </Nav.Link>
            {!tokenLocal.token && (
              <Nav.Link as={NavLink} to="/register">
                Registro
              </Nav.Link>
            )}
            {user.role === "admin" && (
              <Nav.Link as={NavLink} to="/admin">
                Subir nuevo meme
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="text-white">
          <div className="mx-2">
            {user.name}{" "}
            {tokenLocal.token && (
              <span>
                <Button onClick={logout} className="mx-2 btn btn-danger">
                  {" "}
                  Cerrar Sesión
                </Button>
              </span>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
