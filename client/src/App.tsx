import './App.css';
import NavigationMenu from './components/navbar/NavigationMenu';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/moviepages/Home';
import ComingSoon from './components/moviepages/ComingSoon';
import TopRatedIndian from './components/moviepages/TopRatedIndian';
import Favourites from './components/moviepages/Favourites';
import TopRatedMovies from './components/moviepages/TopRatedMovies';
import MovieDetails from './components/MovieDetails';

function App() {

	return (
		<>
			<BrowserRouter>
				<NavigationMenu />

				<Container>
					<Routes>
						<Route path="/movies/:id" element={<MovieDetails />} />
						<Route path="/favourities" element={<Favourites />} />
						<Route path="/top-rated-movies" element={<TopRatedMovies />} />
						<Route path="/top-rated-indian" element={<TopRatedIndian />} />
						<Route path="/coming-soon" element={<ComingSoon />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
