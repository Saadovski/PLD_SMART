import { useParams } from "react-router";

function SessionPage() {
  const { id } = useParams();

  return <div>Session {id}</div>;
}

export default SessionPage;
