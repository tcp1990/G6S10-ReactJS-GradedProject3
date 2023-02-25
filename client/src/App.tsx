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
            <Route path="/about" element={<h1>Hi About</h1>} />
            <Route path="/restaurants/:id" element={<h1>Hi restaurant details</h1>} />
            <Route path="/restaurants" element={<h1>Hi restaurants List</h1>} />
            <Route path="/" element={<h1>Hi Home</h1>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
