import { getNotes } from "../../api/notes";
import Card from "./Card";
import "./CardList.scss";
import useNotes from "../../hooks/useNotes";

function CardList() {
  const { refetch, isFetching } = useNotes();

  return (
    <div className="card__container">
      <h1>Notes:</h1>
      {isFetching && <p>fetching....</p>}
      <button onClick={() => refetch()}>Refresh</button>
      <QueryHandler />
    </div>
  );
}

const QueryHandler = () => {
  const notesQuery = useNotes();

  const { status, data, error } = notesQuery;

  if (status === "error") {
    return <h3>{error.response?.data?.msg}</h3>;
  } else if (status === "loading") return <h3>Loading...</h3>;

  return (
    <>
      {data.map((note) => (
        <Card key={note.id} id={note.id} title={note.title} body={note.body} />
      ))}
    </>
  );
};

export default CardList;
