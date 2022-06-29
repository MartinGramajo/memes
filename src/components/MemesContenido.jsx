import React from 'react'
import { Container } from 'react-bootstrap';
import Meme from '../components/Meme';


export default function MemesContenido({memes}) {
    const mapMemes = memes.map((meme, id) => (
        <Meme meme={meme} key={id}/>
    ));
      return (
        
        <>
        <h1>Memes</h1>
        <Container className="mt-5 d-flex flex-wrap justify-content-around">
          {mapMemes}
        </Container>
      </>
  )
}
