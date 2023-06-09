import { useParams } from "react-router-dom";
import "./Form.scss";
import useNote from "../../hooks/useNote";

function Form() {
  const params = useParams();

  const id = params.id as string;

  const { data, status, error } = useNote(id);

  if (status === "loading") return <h1>Loading...</h1>;
  else if (status === "error")
    return <h3>Error: {error.response?.data.msg}</h3>;

  const note = data.msg;

  console.log("Data: ", data);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
    </div>
  );
}

export default Form;
