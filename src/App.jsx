import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Write from "./pages/Write/Write";
import Read from "./pages/Read/Read";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </div>
    </>
  );
}

export default App
