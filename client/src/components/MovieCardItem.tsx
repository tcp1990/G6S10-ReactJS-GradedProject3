import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import IMovieItem from '../models/IMovieItem';

type Props = {
    movie: IMovieItem;
    handleFavouritesClick: (params: IMovieItem) => void;
    favouriteComponent: ReactNode;
};

const MovieCardItem = (props: Props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${props.movie.posterurl}`} />
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <div>
                        {props.movie.title}
                    </div>
                </Card.Title>
                <Card.Text>
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