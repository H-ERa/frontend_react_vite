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
          <Route
            path="/"
            element={
              <div
                style={{
                  position: "absolute",   
                  top: "100px",            
                  right: "4vw",  
                  //backgroundColor: "rgba(255, 255, 255, 0.92)",
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  width: "18vw",
                  padding: "30px",
                  fontFamily: "'Times New Roman', serif",
                  color: "#191c1dff",
                  lineHeight: "2",
                }}
              >
                <h1
                  style={{
                    fontSize: "32px",
                    marginBottom: "15px",
                    color: "#5b3a29",
                    fontWeight: "bold",
                    fontFamily: "Cursive",
                  }}
                >
                  Victorian Whisper
                </h1>

                <p>
                  A secret letter exchange born in the heart of Victorian London —
                  where every message is sealed in wax, locked with a word, and
                  burns into memory once read.
                </p>

                <p style={{ marginTop: "16px" }}>
                  Write encrypted letters on parchment, share your secret link, and
                  watch your message vanish in flames once opened.
                </p>

                <p style={{ marginTop: "16px" }}>
                  Built for <b>lovers</b>, <b>rebels</b>, and <b>spies</b> alike —
                  where elegance meets encryption.
                </p>

              </div>
            }
          />

          {/* 其他页面 */}
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
