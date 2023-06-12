import Card from "./Card";
import "./CardList.scss";
import useNotesInfinite from "../../hooks/useNotesInfinite";

function CardList() {
  return (
    <div className="card__container">
      <h1>Notes:</h1>
      <QueryHandler />
    </div>
  );
}

const QueryHandler = () => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotesInfinite();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h3>{error.response?.data.msg}</h3>;

  return (
    <div className="cardlist__container">
      {data?.pages.map((group) => {
        return group.data.map((note) => (
          <Card
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
          />
        ));
      })}
      {hasNextPage && (
        <div className="button__container">
          <button
            disabled={isFetchingNextPage}
            onClick={() => {
              console.log("here");
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
};

// const QueryHandler = () => {
//   const [page, setPage] = useState<number>(1);

//   const notesQuery = useNotes({ page });

//   const futureNotes = useNotes({ page: page + 1 });

//   const { status, data, error, isFetching } = notesQuery;

//   if (status === "error") {
//     return <h3>{error.response?.data?.msg}</h3>;
//   } else if (status === "loading") return <h3>Loading...</h3>;

//   return (
//     <div className="cardlist__container">
//       {isFetching && (
//         <div className="overlay">
//           <p>Loading...</p>
//         </div>
//       )}
//       <div className="top__button__container">
//         <button
//           disabled={page == 1}
//           onClick={() => setPage((prev) => prev - 1)}
//         >
//           Previous
//         </button>
//         <button
//           disabled={futureNotes.data && futureNotes.data.length === 0}
//           onClick={() => setPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//       {data.map((note) => (
//         <Card key={note.id} id={note.id} title={note.title} body={note.body} />
//       ))}
//     </div>
//   );
// };

export default CardList;
