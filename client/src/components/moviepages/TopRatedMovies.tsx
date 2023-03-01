import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getTopRatedMovies } from '../../services/movies';
import IToasterState from '../../models/IToasterState';
import MovieListPage from './MovieListPage';

type Props = {
    searchValue: string;
    toasterstate: IToasterState;
    addFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: any;
};

const TopRatedMovies = (props: Props) => {
    const [movies, setMovies] = useState<IMovieItem[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const topRatedMoviesData = await getTopRatedMovies(props.searchValue);
                setMovies(topRatedMoviesData);
            } catch (error) {

            } finally {

            }
        };

        getMovies();
    }, [props.searchValue]);

    return (
        <>
            <MovieListPage
                movies={movies}
                searchValue={props.searchValue}
                addFavouriteMovieAction={props.addFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default TopRatedMovies;