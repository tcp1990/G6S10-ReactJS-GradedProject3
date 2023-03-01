import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IMovieItem from '../models/IMovieItem';

type Props = {
    movie: IMovieItem
};

const MovieCardItem = (Props: any) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${Props.movie.posterurl}`} />
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <div>
                        {Props.movie.title}
                    </div>
                </Card.Title>
                <Card.Text>
                    <div onClick={() => Props.handleFavouritesClick(Props.movie)}
                        className='movie-favourite-container'>
                        {Props.favouriteComponent}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MovieCardItem;