import './App.css';
import { useState, useEffect } from 'react';
import NavigationMenu from './components/navbar/NavigationMenu';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IMovieItem from "./models/IMovieItem";
import Home from './components/Home';
import ComingSoon from './components/ComingSoon';
import TopRatedIndian from './components/TopRatedIndian';
import Favourites from './components/Favourites';
import TopRatedMovies from './components/TopRatedMovies';
import MovieDetails from './components/MovieDetails';

function App() {

  const [favourites, setFavourites] = useState<IMovieItem[]>([]);
  
  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites') || '{}'
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items: IMovieItem[]) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie: IMovieItem) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie: IMovieItem) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};


  return (
    <>
      <BrowserRouter>
        <NavigationMenu />

        <Container>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails/>} />
            <Route path="/favourities" element={<Favourites/>} />
            <Route path="/top-rated-movies" element={<TopRatedMovies handleFavouritesClick={addFavouriteMovie}/>} />
            <Route path="/top-rated-indian" element={<TopRatedIndian handleFavouritesClick={addFavouriteMovie}/>} />
            <Route path="/coming-soon" element={<ComingSoon handleFavouritesClick={addFavouriteMovie}/>} />
            <Route path="/" element={<Home handleFavouritesClick={addFavouriteMovie}/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
