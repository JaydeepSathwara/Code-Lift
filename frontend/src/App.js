import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import { UserContextProvider } from './UserContext';
import Article from './Pages/ArticlePage/ArticlePage';
import ArticlePage from './Pages/ArticlePage/ArticlePage';
import Articles from './Pages/Articles/Articles.jsx';
import axios from 'axios';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='container'>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/article/:id" element={<ArticlePage />} />
            <Route exact path="/search/:keyword" element = {<Articles />} />
            <Route exact path="/login" element = {<LoginPage />} />
            <Route exact path="/signup" element = {<SignupPage />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
