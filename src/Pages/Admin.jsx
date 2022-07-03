import AdminContenido from '../components/AdminContenido'



export default function Admin(props) {
  const { memes, setMemes, getMemes } = props;
  return (
    <div >
      <AdminContenido getMemes={getMemes} memes={memes} setMemes={setMemes} />
    </div>
  )
}

