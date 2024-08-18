import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import Header from "./components/Header";
import MoviesPortal from "./components/MoviesPortal";

function App() {
  return (
    <div>
      <Header /> {/* JSX Syntax for React component*/}

      <br /> {/* <br></br> is also okay, but this is more recommended for React component*/}

      <div>
        <MoviesPortal /> {/* JSX Syntax for React component*/}
      </div>
    </div>
  );
}

export default App;
