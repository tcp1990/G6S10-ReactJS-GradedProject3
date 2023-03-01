import IMovieItem from "../models/IMovieItem";
import { addFavourites, removeFavourites } from "../services/movies";

const addFavouriteMovie = async (movie: IMovieItem) => {
    await addFavourites(movie);
};

const removeFavouriteMovie = async (movie: IMovieItem) => {
    await removeFavourites(movie);
};

export {
    addFavouriteMovie,
    removeFavouriteMovie
};