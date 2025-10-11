import './App.css'

import { Navbar } from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* pt-16 = same height as navbar */}
        {/* rest of your page */}
      </div>
    </>
  );
}

export default App
