import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Women from "./Components/Category/Women";
import Men from "./Components/Category/Men";
import Kids from "./Components/Category/Kids";

function App() {
  return (
    <div>
      <Header/>

        <Routes>
          <Route path="/women" element={<Women />}/>
          <Route path="/men" element={<Men />}/>
          <Route path="/kids" element={<Kids />}/>
        </Routes>
    </div>
  );
}

export default App;
