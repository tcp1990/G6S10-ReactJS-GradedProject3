import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getUpcomingMovies } from '../../services/movies';
import IToasterState from '../../models/IToasterState';
import MovieListPage from './MovieListPage';
import FavouriteComponent from '../favourites/AddFavourites';

type Props = {
    searchValue: string;
    toasterstate: IToasterState;
    addFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: any;
};

const ComingSoon = (props: Props) => {
    const [movies, setMovies] = useState<IMovieItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const movieType = 'movies-coming';

    useEffect(() => {
        const getMovies = async () => {
            try {
                const upcomingMoviesData = await getUpcomingMovies(props.searchValue);
                setMovies(upcomingMoviesData);
            } catch (error) {
                setError((error as Error).message);
                setShow(true);
            } finally {
                setLoading(false);
            }
        };

        getMovies();
    }, [props.searchValue]);

    return (
        <>
            <MovieListPage
                loading={loading}
                error={error}
                show={show}
                setShow={setShow}
                movies={movies}
                movieType={movieType}
                searchValue={props.searchValue}
                favouriteComponent={<FavouriteComponent />}
                addFavouriteMovieAction={props.addFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default ComingSoon;