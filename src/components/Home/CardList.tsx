import { getNotes } from "../../api/notes";
import Card from "./Card";
import "./CardList.scss";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../../types/data";
import { ApiErrorResponse, ApiSuccessResponse } from "../../types/Response";
import { useState } from "react";

function CardList() {
  const [poll, setPoll] = useState(true);

  const { refetch, isFetching } = useQuery<ApiSuccessResponse<Note[]>>(
    ["notes"],
    getNotes,
    {
      enabled: false,
      // refetchInterval: poll === true ? 5 * 1000 : false,
      // refetchInterval: 5000,
      onSuccess: (data) => {
        const length = data.data.msg.length;
        console.log("Notes Length: ", length);
        if (length > 1) {
          console.log("Stopping polling");
          setPoll(false);
        }
      },
      onError: (error) => {
        let responseError = error as ApiErrorResponse;
        console.log("Error: ", responseError.response?.data.msg);
        setPoll(false);
      },
    }
  );

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
  const notesQuery = useQuery<ApiSuccessResponse<Note[]>>(["notes"], getNotes);

  const error = notesQuery.error as ApiErrorResponse;

  const { status, data } = notesQuery;

  if (status === "error") {
    return <h3>{error.response?.data?.msg}</h3>;
  } else if (status === "loading") return <h3>Loading...</h3>;

  return (
    <>
      {data.data.msg.map((note) => (
        <Card key={note.id} title={note.title} body={note.body} />
      ))}
    </>
  );
};

export default CardList;
