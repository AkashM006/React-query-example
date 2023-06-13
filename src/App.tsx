import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
