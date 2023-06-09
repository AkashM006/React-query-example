import { useNavigate } from "react-router-dom";
import "./Card.scss";

function Card({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  const link = `/notes/${id}`;
  const navigate = useNavigate();

  const handleNavigation = () => navigate(link);

  return (
    <div className="card" onClick={handleNavigation}>
      <h2 className="card__title">{title}</h2>
      <p className="card__body">{body}</p>
    </div>
  );
}

export default Card;
