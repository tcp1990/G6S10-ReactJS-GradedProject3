import { useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import IMovieItem from "../../models/IMovieItem";
import { LoadingStatus } from "../../models/types";
import { getMovieById } from "../../services/movies";
import LoadingIndicator from "../common/LoadingIndicator";
import Rating from "../common/Rating";

type Props = {
    movieType: string;
}

const styles = {
    detailRow: {
        padding: '5px'
    }
}

const MovieDetails = (props: Props) => {
    let { id } = useParams();
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [movie, setMovie] = useState<IMovieItem | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById({ movieType: props.movieType, suffix: id });
                setMovie(data);
                setStatus('LOADED');
            } catch (error) {
                setError(error as Error);
                setStatus('ERROR_LOADING');
            }
        };

        fetchMovie();
    }, [props.movieType, id]);

    let el;

    switch (status) {
        case 'LOADING':
            el = (
                <LoadingIndicator
                    size="large"
                    message="We are fetching the details of the movie. Please wait..."
                />
            );
            break;
        case 'LOADED':
            const {
                title,
                year,
                genres,
                ratings,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                originalTitle,
                storyline,
                actors,
                imdbRating,
                posterurl
            } = movie as IMovieItem;

            const newRating = (ratings.reduce((a, v) => a = a + (v / 2), 0)) / ratings.length;

            el = (
                <>
                    <Row>
                        <Col xs={12}>
                            <h1>{title} ({year})</h1>
                            <hr />
                        </Col>
                        <Col xs={12} lg={4} className="my-2">
                            <img
                                src={`${posterurl}`}
                                alt={title}
                                className="w-100"
                            />
                        </Col>
                        <Col xs={12} lg={8} className="my-2">
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Original Title</span>
                                </Col>
                                <Col>
                                    {originalTitle}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Rating</span>
                                </Col>
                                <Col>
                                    <Rating value={newRating} className="me-2" />
                                    {newRating.toFixed(3)} ({ratings.length} ratings)
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">imdbRating</span>
                                </Col>
                                <Col>
                                    {imdbRating}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Content Rating</span>
                                </Col>
                                <Col>
                                    {contentRating}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Average Rating</span>
                                </Col>
                                <Col>
                                    {averageRating}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Duration</span>
                                </Col>
                                <Col>
                                    {duration}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Genres</span>
                                </Col>
                                <Col>
                                    {genres.map(e => e).join(', ')}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Actors</span>
                                </Col>
                                <Col>
                                    {actors.map(e => e).join(', ')}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Release Date</span>
                                </Col>
                                <Col>
                                    {releaseDate}
                                </Col>
                            </Row>
                            <Row className="text-sm" style={styles.detailRow}>
                                <Col>
                                    <span className="ms-2">Story line</span>
                                </Col>
                                <Col>
                                    {storyline}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            );
            break;
        case 'ERROR_LOADING':
            el = (
                <Alert variant="danger my-3">
                    {error?.message}
                </Alert>
            );
            break;
    }

    return el;
}

export default MovieDetails;