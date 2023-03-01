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
import { useState } from 'react';
import IToasterState from './models/IToasterState';
import IMovieItem from './models/IMovieItem';
import { addFavourites, removeFavourites } from './services/movies';

function App() {

	const [searchValue, setSearchValue] = useState('');
	const [toasterstate, setToasterstate] = useState<IToasterState>({
		responseState: 'initial',
		toastMessage: '',
		show: false
	});

	const addFavouriteMovieAction = async (movie: IMovieItem) => {
		try {
			setToasterstate({
				...toasterstate,
				responseState: 'initial'
			});
			const data = await addFavourites(movie);
			setToasterstate({
				...toasterstate,
				responseState: 'success',
				toastMessage: `A menu item with id=${data.id} has been added successfully`,
				show: true
			});

		} catch (error) {
			setToasterstate({
				...toasterstate,
				responseState: 'error',
				toastMessage: (error as Error).message,
				show: true
			});
		}
	};

	const removeFavouriteMovieAction = async (movie: IMovieItem) => {
		try {
			setToasterstate({
				...toasterstate,
				responseState: 'initial'
			});
			const data = await removeFavourites(movie);
			setToasterstate({
				...toasterstate,
				responseState: 'success',
				toastMessage: `A menu item with id=${data.id} has been removed successfully`,
				show: true
			});

		} catch (error) {
			setToasterstate({
				...toasterstate,
				responseState: 'error',
				toastMessage: (error as Error).message,
				show: true
			});
		}
	};

	return (
		<>
			<BrowserRouter>

				<NavigationMenu
					searchValue={searchValue}
					setSearchValue={setSearchValue} />

				<Container>
					<Routes>
						<Route path="/movies/:id" element={<MovieDetails />} />
						<Route path="/favourities" element={<Favourites
							removeFavouriteMovieAction={removeFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/top-rated-movies" element={<TopRatedMovies
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/top-rated-indian" element={<TopRatedIndian
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/coming-soon" element={<ComingSoon
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/" element={<Home
							searchValue={searchValue}
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

					</Routes>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
