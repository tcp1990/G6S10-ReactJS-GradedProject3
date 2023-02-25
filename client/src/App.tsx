import './App.css';
import NavigationMenu from './components/NavigationMenu';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationMenu />

        <Container>
          <Routes>
            <Route path="/restaurants/:id" element={<h1>Hi restaurant details</h1>} />
            <Route path="/TopRatedIndian" element={<h1>Hi Top rated Indian</h1>} />
            <Route path="/TopRatedMovies" element={<h1>Hi Top rated movies</h1>} />
            <Route path="/ComingSoon" element={<h1>Hi ComingSoon</h1>} />
            <Route path="/" element={<h1>Hi Movies in theaters</h1>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
