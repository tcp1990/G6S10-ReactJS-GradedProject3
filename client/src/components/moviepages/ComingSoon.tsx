import IMovieItem from "../../models/IMovieItem";
import IToasterState from '../../models/IToasterState';
import MovieListPage from './MovieListPage';
import FavouriteComponent from '../favourites/AddFavourites';

type Props = {
    searchValue: string;
    movieType: string;
    toasterstate: IToasterState;
    addFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: (params: IToasterState) => void;
};

const ComingSoon = (props: Props) => {
    return (
        <>
            <MovieListPage
                movieType={props.movieType}
                searchValue={props.searchValue}
                favouriteComponent={<FavouriteComponent />}
                addFavouriteMovieAction={props.addFavouriteMovieAction}
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />
        </>
    );
};

export default ComingSoon;