import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/Homepage/Homepage';
import PresspagePublic from "./components/Presspage/PresspagePublic";
import Ticketspage from "./components/Ticketspage/Ticketspage";
import WptNavbar from './components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <div>
      <WptNavbar />
      <div className='app-header'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/tickets' element={<Ticketspage />}/>
            <Route path='/press' element={<PresspagePublic />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
