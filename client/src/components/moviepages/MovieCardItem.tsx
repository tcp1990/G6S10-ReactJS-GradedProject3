import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import IMovieItem from '../../models/IMovieItem';
import { useNavigate } from "react-router-dom";
import { movieTypeList } from '../../models/movieTypeList';

type Props = {
    movie: IMovieItem;
    movieType: string;
    handleFavouritesClick: (params: IMovieItem) => void;
    favouriteComponent: ReactNode;
    invokeReload: () => void;
};

const styles = {
    card: {
        backgroundColor: '#B7E0F2',
        padding: '2px',
        width: '18rem',
        height: '30rem'
    },
    cardImage: {
        width: '100%',
        height: '80%',
        cursor: 'pointer'
    },
    cardBody: {
        width: '100%',
        height: '20%'
    },
    cardTitle: {
        width: '100%',
        height: '50%'
    },
    cardText: {
        width: '100%',
        height: '50%',
        cursor: 'pointer'
    }
}

const MovieCardItem = (props: Props) => {

    const navigate = useNavigate();

    const navigateUrl = `/${props.movieType}/${props.movie.id}`;

    const navigateToDetailsPage = () => {
        navigate(navigateUrl);
    };

    const onFavouriteClick = () => {
        if (props.movieType === movieTypeList[4]) {
            props.handleFavouritesClick(props.movie);
            props.invokeReload();
        }
        else {
            props.handleFavouritesClick(props.movie);
        }
    }

    return (
        <Card style={styles.card}>
            <Card.Img variant="top"
                src={`${props.movie.posterurl}`}
                alt={props.movie.title}
                style={styles.cardImage}
                onClick={navigateToDetailsPage} />
            <Card.Body
                style={styles.cardBody}>
                <Card.Title
                    className="d-flex justify-content-between"
                    style={styles.cardTitle}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {props.movie.title}
                    </div>
                </Card.Title>
                <Card.Text style={styles.cardText}>
                    <div onClick={onFavouriteClick}
                        className='movie-favourite-container'>
                        {props.favouriteComponent}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MovieCardItem;