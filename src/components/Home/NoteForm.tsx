import "./NoteForm.scss";
import { useState } from "react";

function NoteForm() {
  const submitHandler = () => {
    console.log("Submitted");
  };

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  return (
    <>
      <div className="form__container">
        <h2>Add new Note</h2>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body: </label>
          <input
            type="text"
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            id="body"
          />
        </div>
        <button onClick={submitHandler}>Create new Note</button>
        <hr />
      </div>
    </>
  );
}

export default NoteForm;
