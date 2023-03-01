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

    useEffect(() => {
        const getMovies = async () => {
            try {
                const favouritesData = await getFavourites(props.searchValue);
                setMovies(favouritesData);
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
                addFavouriteMovieAction={props.removeFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default Favourites;