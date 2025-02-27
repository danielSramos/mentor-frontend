import { useParams } from "react-router-dom";

function PerfilMentor() {
  const { id } = useParams();
  return <p>Perfil ID {id}</p>;
}

export default PerfilMentor;
