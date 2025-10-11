import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Write from "./pages/Write/Write";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/write" element={<Write />} />
        </Routes>
      </div>
    </>
  );
}

export default App
