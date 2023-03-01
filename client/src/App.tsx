import './App.css';
import NavigationMenu from './components/navbar/NavigationMenu';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesInTheaters from './components/moviepages/MoviesInTheaters';
import ComingSoon from './components/moviepages/ComingSoon';
import TopRatedIndian from './components/moviepages/TopRatedIndian';
import Favourites from './components/moviepages/Favourites';
import TopRatedMovies from './components/moviepages/TopRatedMovies';
import MovieDetails from './components/MovieDetails';
import { useState } from 'react';
import IToasterState from './models/IToasterState';
import IMovieItem from './models/IMovieItem';
import { addFavourites, removeFavourites } from './services/movies';

const movieTypeList = [
	'movies-in-theaters',
	'movies-coming',
	'top-rated-india',
	'top-rated-movies',
	'favourite'];

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
						<Route path="/movies-in-theaters/:id"
							element={<MovieDetails movieType={movieTypeList[0]} />} />
						<Route path="/movies-coming/:id"
							element={<MovieDetails movieType={movieTypeList[1]} />} />
						<Route path="/top-rated-india/:id"
							element={<MovieDetails movieType={movieTypeList[2]} />} />
						<Route path="/top-rated-movies/:id"
							element={<MovieDetails movieType={movieTypeList[3]} />} />
						<Route path="/favourite/:id"
							element={<MovieDetails movieType={movieTypeList[4]} />} />

						<Route path="/favourities" element={<Favourites
							searchValue={searchValue}
							removeFavouriteMovieAction={removeFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/top-rated-movies" element={<TopRatedMovies
							searchValue={searchValue}
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/top-rated-indian" element={<TopRatedIndian
							searchValue={searchValue}
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/coming-soon" element={<ComingSoon
							searchValue={searchValue}
							addFavouriteMovieAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/" element={<MoviesInTheaters
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
