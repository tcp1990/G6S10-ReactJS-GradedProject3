import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getFavourites } from '../../services/movies';
import IToasterState from '../../models/IToasterState';
import MovieListPage from './MovieListPage';

type Props = {
    searchValue: string;
    toasterstate: IToasterState;
    removeFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: any;
};

const Favourites = (props: Props) => {

    const [movies, setMovies] = useState<IMovieItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const favouritesData = await getFavourites(props.searchValue);
                setMovies(favouritesData);
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
                searchValue={props.searchValue}
                addFavouriteMovieAction={props.removeFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default Favourites;