import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { leerDeLocalStorage } from "../utils/localStorage";

export default function DetalleMeme() {
  const { memeId } = useParams(); // datos que recibimos de la ruta y es el id que debemos buscar en nuestro array "memes"

  const memes = leerDeLocalStorage("memes") || [];

  const memeEncontrado = memes.find((meme) => meme.id === memeId);

  if (memeEncontrado === undefined) {
    return <h1> meme no encontrado</h1>;
  }

  return (
    <div className="mx-auto">
      <h1 className="my-4"> detalle de cada meme</h1>
      <Card className="card-meme my-5" style={{width:"30rem"}}>
        <Card.Img
          className="w-100"
          variant="top"
          src={memeEncontrado?.imagen}
        />
        <Card.Body>
          <Card.Title>{memeEncontrado?.titulo}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
