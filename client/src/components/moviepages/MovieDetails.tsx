import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Row, Col, Badge, Alert } from "react-bootstrap";
import { Route, useNavigate, useParams } from 'react-router-dom';
import IMovieItem from "../../models/IMovieItem";
import { LoadingStatus } from "../../models/types";
import { getMovieById } from "../../services/movies";
import LoadingIndicator from "../common/LoadingIndicator";
import Rating from "../common/Rating";

type Props = {
    movieType: string;
}

const MovieDetails = (props: Props) => {
    let { id } = useParams();
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [movie, setMovie] = useState<IMovieItem | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
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
        },
        []
    );

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
                id,
                title,
                year,
                genres,
                ratings,
                poster,
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

            el = (
                <>
                    <Row>
                        <Col xs={12}>
                            <h1>{title}</h1>
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
                            {/* <div>
                                {
                                    cuisines.map(
                                        cuisine => (
                                            <Badge
                                                bg="primary me-2"
                                                key={cuisine}
                                            >
                                                {cuisine}
                                            </Badge>
                                        )
                                    )
                                }
                            </div> */}
                            <div className="fs-5 my-2">{storyline}</div>
                            <Row xs={3} className="text-sm">
                                {/* <Col>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span className="ms-2">{opens} - {closes}</span>
                                </Col> */}
                                <Col>
                                    <Rating value={averageRating} className="me-2" />
                                    {ratings} ({imdbRating} ratings)
                                </Col>
                                {/* <Col>
                                    Cost for two: Rs. {costForTwo}
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>

                    {/* <Route
                        path={match.path}
                        render={(props: RouteComponentProps) => <Menu {...props} id={id} />}
                        exact
                    />
                    <Route
                        path={`${match.path}/add`}
                        render={(props: RouteComponentProps) => <AddMenuItem {...props} id={id} />}
                    /> */}
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