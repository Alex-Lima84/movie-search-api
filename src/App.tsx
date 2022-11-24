import RoutesApp from "./Routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <ToastContainer autoClose={1500} />
      <RoutesApp />
      <Footer />
    </div>
  );
}

export default App;
