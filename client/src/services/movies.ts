import axios from 'axios';
import IMovieItem from '../models/IMovieItem';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type Props = {
    suffix: string | undefined;
    movieType:string;
}
const getMovieById = ( props : Props ) => {
    return axios.get<IMovieItem>( `${process.env.REACT_APP_API_BASE_URL}/${props.movieType}/${props.suffix}` )
            .then( response => response.data )
};

const getUpcomingMovies = (props: string) => {
    var suffix = (props === '') ? '' : `/_search?title=${props}`;
    return axios.get<IMovieItem[]>(`${baseUrl}/movies-coming${suffix}`)
        .then(response => response.data)
};

const getMoviesInTheaters = (props: string) => {
    var suffix = (props === '') ? '' : `/_search?title=${props}`;
    return axios.get<IMovieItem[]>(`${baseUrl}/movies-in-theaters${suffix}`)
        .then(response => response.data)
};

const getTopRatedIndia = (props: string) => {
    var suffix = (props === '') ? '' : `/_search?title=${props}`;
    return axios.get<IMovieItem[]>(`${baseUrl}/top-rated-india${suffix}`)
        .then(response => response.data)
};

const getTopRatedMovies = (props: string) => {
    var suffix = (props === '') ? '' : `/_search?title=${props}`;
    return axios.get<IMovieItem[]>(`${baseUrl}/top-rated-movies${suffix}`)
        .then(response => response.data)
};

const getFavourites = (props: string) => {
    var suffix = (props === '') ? '' : `/_search?title=${props}`;
    return axios.get<IMovieItem[]>(`${baseUrl}/favourite${suffix}`)
        .then(response => response.data)
};

const addFavourites = (favouritemovie: IMovieItem) => {
    return axios.post<IMovieItem>(
        `${baseUrl}/favourite`,
        favouritemovie,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.data)
};

const removeFavourites = (favouritemovie: IMovieItem) => {
    return axios.delete<IMovieItem>(
        `${baseUrl}/favourite/${favouritemovie.id}`
    ).then(response => response.data)
};

export {
    getMovieById,
    getUpcomingMovies,
    getMoviesInTheaters,
    getTopRatedIndia,
    getTopRatedMovies,
    getFavourites,
    addFavourites,
    removeFavourites
};