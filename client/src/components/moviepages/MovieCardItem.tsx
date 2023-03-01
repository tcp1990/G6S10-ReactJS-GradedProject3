import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IMovieItem from '../../models/IMovieItem';

type Props = {
    movie: IMovieItem;
    movieType: string;
    handleFavouritesClick: (params: IMovieItem) => void;
    favouriteComponent: ReactNode;
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
        height: '80%'
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
        height: '50%'
    }
}

const MovieCardItem = (props: Props) => {

    return (
        <Card style={styles.card}>
            <Card.Img variant="top"
                src={`${props.movie.posterurl}`}
                alt={props.movie.title}
                style={styles.cardImage} />
            <Card.Body
                style={styles.cardBody}>
                <Card.Title
                    className="d-flex justify-content-between"
                    style={styles.cardTitle}>
                    <div>
                        {props.movie.title}
                    </div>
                    <div>
                        <Link to={`/${props.movieType}/${props.movie.id}`} className="btn btn-primary btn-sm">
                            Details
                        </Link>
                    </div>
                </Card.Title>
                <Card.Text style={styles.cardText}>
                    <div onClick={() => props.handleFavouritesClick(props.movie)}
                        className='movie-favourite-container'>
                        {props.favouriteComponent}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MovieCardItem;