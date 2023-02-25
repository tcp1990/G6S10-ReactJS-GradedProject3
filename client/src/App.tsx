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
            <Route path="/favourities" element={<h1>Hi Favourities</h1>} />
            <Route path="/top-rated-movies" element={<h1>Hi Top rated movies</h1>} />
            <Route path="/top-rated-indian" element={<h1>Hi Top rated Indian</h1>} />
            <Route path="/coming-soon" element={<h1>Hi ComingSoon</h1>} />
            <Route path="/" element={<h1>Hi Movies in theaters</h1>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
