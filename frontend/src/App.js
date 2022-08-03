import { BrowserRouter, Routes, Route } from "react-router-dom";
import Presspage from "./components/Presspage/Presspage";
import Homepage from './components/Homepage/Homepage';
import Ticketspage from "./components/Ticketspage/Ticketspage";
import WptNavbar from './components/Navbar/Navbar';
import './App.css';

function isToken() {
  return localStorage.getItem('token') !== null;
}

function logIn(token, user_id) {
  localStorage.setItem('token', token);
  localStorage.setItem('user_id', user_id);
  window.location.reload();
}

function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  window.location.reload();
}

function App() {
  let auth = isToken();

  return (
    <div>
      <WptNavbar auth={auth} logOut={logOut}/>
      <div className='app-header'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/tickets' element={<Ticketspage />}/>
            <Route path='/press' element={<Presspage auth={auth} logIn={logIn} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
