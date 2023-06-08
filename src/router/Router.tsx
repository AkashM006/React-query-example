import { Routes, Route } from "react-router-dom";
import HomeView from "../Views/HomeView";
import DetailedView from "../Views/DetailedView";
import MissingView from "../Views/MissingView";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/notes/:id" element={<DetailedView />} />
      <Route path="*" element={<MissingView />} />
    </Routes>
  );
}

export default Router;
