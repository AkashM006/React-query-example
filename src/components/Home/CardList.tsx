import { getNotes } from "../../api/notes";
import Card from "./Card";
import "./CardList.scss";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Note } from "../../types/data";
import { ApiErrorResponse, ApiResponse } from "../../types/Response";

function CardList() {
  const { refetch, isFetching } = useQuery(["notes"], getNotes, {
    enabled: false,
    // refetchInterval: poll === true ? 5 * 1000 : false,
    // refetchInterval: 5000,
  });

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
  const notesQuery: UseQueryResult<
    ApiResponse<Note[]>,
    ApiErrorResponse
  > = useQuery(["notes"], getNotes, {
    onSuccess: (data) => {
      console.log("Notes: ", data.msg);
    },
    onError: (error) => {
      console.log("Error: ", error.response?.data.msg);
    },
    select(data) {
      return data.data;
    },
    // refetchInterval: poll ? 5000 : false
  });

  const error = notesQuery.error as ApiErrorResponse;

  const { status, data } = notesQuery;

  if (status === "error") {
    return <h3>{error.response?.data?.msg}</h3>;
  } else if (status === "loading") return <h3>Loading...</h3>;

  return (
    <>
      {data.msg.map((note) => (
        <Card key={note.id} title={note.title} body={note.body} />
      ))}
    </>
  );
};

export default CardList;
