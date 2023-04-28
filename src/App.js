
import "./App.css";
import MainComponent from "./Components/MainComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <MainComponent />
      <Toaster />
    </div>
  );
}

export default App;
