import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NavReact from './components/NavReact';
import Admin from './Pages/Admin';
import DetalleMeme from './Pages/DetalleMeme';
import Login from './Pages/Login';
import Memes from './Pages/Memes';
import Perfil from './Pages/Perfil';
import Register from './Pages/Register';
import { leerDeLocalStorage } from './utils/localStorage';

// const memesLocal = leerDeLocalStorage("memes") || [];


function App() {

  const [memes, setMemes] = useState([]);
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  // Consulta Api para traer la info del usuario en el login. 
  const requestUserData = async () => {
    setIsLoading(true) // state para mostrar que vamos a esperar por los datos de la consulta. 
    // para evitar el 404 al loguearse
    const tokenLocal = leerDeLocalStorage("token") || {};
    // Modificamos para que se ejecute solo si existe un token
    if (tokenLocal.token) {
      const headers = { 'x-auth-token': tokenLocal.token };
      const response = await axios.get('http://localhost:4000/api/auth', { headers });
      setUser(response.data) // setteamos la info de nuestro usuario. 
    }
    setIsLoading(false)
  }

  useEffect(() => {
    requestUserData()
  }, [])

  // Condicional para autorizar al user a que pagina va a poder acceder. 
  const isAdmin = user.role === 'admin'

  // consulta Api para traer los memes
  useEffect(() => {
    const request = async () => {
      const response = await axios.get('http://localhost:4000/api/memes');
      setMemes(response.data) // setteamos la info de nuestro usuario. 
    }
    request()
  }, [])

  // condicional para evitar el error 404 en las rutas privadas 
  if (isLoading) {
    return <>
      Cargando...
      <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
    </>
  }

  return (
    <div className="footer-fix" >
      <BrowserRouter>
        <NavReact user={user}  />
        <Routes>
          <Route
            path="/"
            element={
              <Memes memes={memes}
              />} />

          <Route
            path="/meme/:memeId"
            element={
              <DetalleMeme
              />} />


          <Route
            path="/login"
            element={<Login requestUserData={requestUserData} />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
          {<Route
            path="/perfil"
            element={<Perfil />}
          />}
          {/* condicional para ruta privada  */}
          {isAdmin && <Route
            path="/admin"
            element={<Admin memes={memes} setMemes={setMemes} user={user} />}
          />}
          <Route
            path="*"
            element={<h1> 404</h1>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
