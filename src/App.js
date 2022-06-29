import axios from 'axios';
import { useEffect, useState } from 'react';
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
const tokenLocal = leerDeLocalStorage("token") || {};

function App() {

  const [memes, setMemes] = useState([]);
  console.log("file: App.js ~ line 20 ~ App ~ memes", memes)
  const [user, setUser] = useState({})


  // Consulta Api para traer la info del usuario en el login. 
  useEffect(() => {
    if (!tokenLocal.token) return;
    const request = async () => {
      const headers = { 'x-auth-token': tokenLocal.token };
      const response = await axios.get('http://localhost:4000/api/auth', { headers });
      setUser(response.data) // setteamos la info de nuestro usuario. 
    }
    request()
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


  return (
    <div className="footer-fix" >
      <BrowserRouter>
        <NavReact user={user} />
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
            element={<Login />}
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
