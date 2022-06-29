import React from 'react'
import { Button, Card } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "./meme.css";

export default function Meme(props) {

  return (
    <div className=" d-flex justify-content-around" >
      <Card className='card-meme'>
        <Card.Img variant="top" src={props.meme.imagen} />
        <Card.Body>
          <Card.Title>{props.meme.titulo}</Card.Title>
          {/* <span>{props.meme.publishDate}</span> */}
          {/* <span>Creador: {props.meme.creador?.name}</span> */}
          {/* <span>{props.meme.creador &&' Creador:' + ' ' + props.meme.creador.name}</span> */}
          {props.meme.creador && <span> Creador: {props.meme.creador?.name}</span>}
        </Card.Body>
        <Button as={NavLink} to={`/meme/${props.meme.id}`}> Ver detalle </Button>
      </Card>
    </div>
  )
}
