import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavReact({user}) {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as = {NavLink} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as = {NavLink} to="/">Memes</Nav.Link>
            <Nav.Link as = {NavLink} to="/login" >Login</Nav.Link>
            <Nav.Link as={NavLink} to="/perfil" >Perfil</Nav.Link>
            <Nav.Link as = {NavLink} to="/register" >Registro</Nav.Link>
            {user.role === "admin" && <Nav.Link as = {NavLink} to="/admin">Subir nuevo meme</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        <div className="text-white">
        {user.name}
        </div>
        
      </Container>
    </Navbar>
  );
}
