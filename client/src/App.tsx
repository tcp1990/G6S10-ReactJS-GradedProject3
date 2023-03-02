import './App.css';
import NavigationMenu from './components/navbar/NavigationMenu';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './components/moviepages/MovieDetails';
import { useState } from 'react';
import IToasterState from './models/IToasterState';
import IMovieItem from './models/IMovieItem';
import { addFavourites, removeFavourites } from './services/movies';
import MovieListPage from './components/moviepages/MovieListPage';
import AddFavourites from './components/favourites/AddFavourites';
import RemoveFavourites from './components/favourites/RemoveFavourites';
import { movieTypeList } from './models/movieTypeList';

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
			await addFavourites(movie);
			setToasterstate({
				...toasterstate,
				responseState: 'success',
				toastMessage: `Successfully added to favourite`,
				show: true
			});

		} catch (error) {
			setToasterstate({
				...toasterstate,
				responseState: 'error',
				toastMessage: 'Already added in favourite',
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
			await removeFavourites(movie);
			setToasterstate({
				...toasterstate,
				responseState: 'success',
				toastMessage: `Successfully removed from favourite`,
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
					setSearchValue={setSearchValue}
					movieTypeList={movieTypeList} />

				<Container>
					<Routes>
						<Route path={`/${movieTypeList[0]}/:id`}
							element={<MovieDetails movieType={movieTypeList[0]} />} />
						<Route path={`/${movieTypeList[1]}/:id`}
							element={<MovieDetails movieType={movieTypeList[1]} />} />
						<Route path={`/${movieTypeList[2]}/:id`}
							element={<MovieDetails movieType={movieTypeList[2]} />} />
						<Route path={`/${movieTypeList[3]}/:id`}
							element={<MovieDetails movieType={movieTypeList[3]} />} />
						<Route path={`/${movieTypeList[4]}/:id`}
							element={<MovieDetails movieType={movieTypeList[4]} />} />

						<Route path={`/${movieTypeList[4]}`} element={<MovieListPage
							movieType={movieTypeList[4]}
							searchValue={searchValue}
							favouriteComponent={<RemoveFavourites />}
							favouriteClickAction={removeFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path={`/${movieTypeList[3]}`} element={<MovieListPage
							movieType={movieTypeList[3]}
							searchValue={searchValue}
							favouriteComponent={<AddFavourites />}
							favouriteClickAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path={`/${movieTypeList[2]}`} element={<MovieListPage
							movieType={movieTypeList[2]}
							searchValue={searchValue}
							favouriteComponent={<AddFavourites />}
							favouriteClickAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path={`/${movieTypeList[1]}`} element={<MovieListPage
							movieType={movieTypeList[1]}
							searchValue={searchValue}
							favouriteComponent={<AddFavourites />}
							favouriteClickAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

						<Route path="/" element={<MovieListPage
							movieType={movieTypeList[0]}
							searchValue={searchValue}
							favouriteComponent={<AddFavourites />}
							favouriteClickAction={addFavouriteMovieAction}
							toasterstate={toasterstate}
							setToasterstate={setToasterstate} />} />

					</Routes>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
