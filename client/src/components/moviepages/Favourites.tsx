import IMovieItem from "../../models/IMovieItem";
import IToasterState from '../../models/IToasterState';
import MovieListPage from './MovieListPage';
import RemoveFavourites from '../favourites/RemoveFavourites';

type Props = {
    searchValue: string;
    movieType: string;
    toasterstate: IToasterState;
    removeFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: (params: IToasterState) => void;
};

const Favourites = (props: Props) => {

    return (
        <>
            <MovieListPage
                movieType={props.movieType}
                searchValue={props.searchValue}
                favouriteComponent={<RemoveFavourites />}
                addFavouriteMovieAction={props.removeFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default Favourites;