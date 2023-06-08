import "./Card.scss";

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <p className="card__body">{body}</p>
    </div>
  );
}

export default Card;
