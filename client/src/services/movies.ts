import axios from 'axios';
import IMovieItem from '../models/IMovieItem';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type Props = {
    movieType: string;
    suffix: string | undefined;
}

const getMovieById = (props: Props) => {
    const url = `${baseUrl}/${props.movieType}/${props.suffix}`;
    return axios.get<IMovieItem>(url)
        .then(response => response.data)
};

const getMovieList = (props: Props) => {
    const suffix = (props.suffix === '') ? '' : `/_search?title=${props.suffix}`;
    const url = `${baseUrl}/${props.movieType}${suffix}`;
    return axios.get<IMovieItem[]>(url)
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
    getMovieList,
    addFavourites,
    removeFavourites
};