import './App.css';
import NavigationMenu from './components/navbar/NavigationMenu';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Favourites from './components/Favourites';
import TopRatedMovies from './components/TopRatedMovies';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationMenu />

        <Container>
          <Routes>
            <Route path="/restaurants/:id" element={<h1>Hi restaurant details</h1>} />
            <Route path="/favourities" element={<Favourites/>} />
            <Route path="/top-rated-movies" element={<TopRatedMovies/>} />
            <Route path="/top-rated-indian" element={<h1>Hi Top rated Indian</h1>} />
            <Route path="/coming-soon" element={<h1>Hi ComingSoon</h1>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
