import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import { UserContextProvider } from './UserContext';
import Article from './Pages/ArticlePage/ArticlePage';
import ArticlePage from './Pages/ArticlePage/ArticlePage';

function App() {
  return (
    <div className='container'>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
