import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getTopRatedIndia } from '../../services/movies';
import IToasterState from '../../models/IToasterState';
import MovieListPage from './MovieListPage';

type Props = {
    searchValue: string;
    toasterstate: IToasterState;
    addFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: any;
};

const TopRatedIndian = (props: Props) => {
    const [movies, setMovies] = useState<IMovieItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const topRatedIndiaData = await getTopRatedIndia(props.searchValue);
                setMovies(topRatedIndiaData);
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
                movies={movies}
                searchValue={props.searchValue}
                addFavouriteMovieAction={props.addFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default TopRatedIndian;