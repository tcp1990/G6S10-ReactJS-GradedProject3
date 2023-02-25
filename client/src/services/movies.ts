import axios from 'axios';
import IMovieItem from '../models/IMovieItem';

const getUpcominMovies = () => {
    return axios.get<IMovieItem[]>( `${process.env.REACT_APP_API_BASE_URL}/movies-coming` )
            .then( response => response.data )
};

const getMoviesInTheaters = () => {
    return axios.get<IMovieItem[]>( `${process.env.REACT_APP_API_BASE_URL}/movies-in-theaters` )
            .then( response => response.data )
};

const getTopRatedIndia = () => {
    return axios.get<IMovieItem[]>( `${process.env.REACT_APP_API_BASE_URL}/top-rated-india` )
            .then( response => response.data )
};

const getTopRatedMovies = () => {
    return axios.get<IMovieItem[]>( `${process.env.REACT_APP_API_BASE_URL}/top-rated-movies` )
            .then( response => response.data )
};

const getFavourites = () => {
    return axios.get<IMovieItem[]>( `${process.env.REACT_APP_API_BASE_URL}/favourite` )
            .then( response => response.data )
};

export {
    getUpcominMovies,
    getMoviesInTheaters,
    getTopRatedIndia,
    getTopRatedMovies,
    getFavourites
};