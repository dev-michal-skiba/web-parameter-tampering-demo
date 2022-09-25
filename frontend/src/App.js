import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PresspagePrivate from "./components/Presspage/PresspagePrivate";
import PresspagePublic from "./components/Presspage/PresspagePublic";
import Homepage from './components/Homepage/Homepage';
import Ticketspage from "./components/Ticketspage/Ticketspage";
import WptNavbar from './components/Navbar/Navbar';
import Account from "./components/Account/Account";
import './App.css';

function isToken() {
  return localStorage.getItem('token') !== null;
}

function logIn(token, user_id, username) {
  localStorage.setItem('token', token);
  localStorage.setItem('user_id', user_id);
  localStorage.setItem('username', username);
  window.location.reload();
}

function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('username');
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
            <Route path='/press' element={auth ? <PresspagePrivate />: <PresspagePublic logIn={logIn} />}/>
            <Route path='/account' element={auth ? <Account />: <Navigate to="/" />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
