import AdminContenido from '../components/AdminContenido'



export default function Admin(props) {
  const { memes, setMemes } = props;
  return (
    <div >
      <AdminContenido memes={memes} setMemes={setMemes} />
    </div>
  )
}

