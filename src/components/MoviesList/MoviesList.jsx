import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { formateDate, formatePhoto } from 'utils/formatting';
import { Box } from 'components/Box';
import { Link } from 'react-router-dom';
import {
  MoviesGrid,
  MovieItem,
  Wrapper,
  Poster,
  Info,
  Year,
  Rating,
} from 'components/MoviesList/MoviesList.styled';

const LinkToMovie = ({ id, children }) => {
  const location = useLocation();
  const pathToMovie =
    location.pathname === '/movies' ? id.toString() : `movies/${id}`;
  return (
    <Link to={pathToMovie} state={{ from: location }}>
      {children}
    </Link>
  );
};

const MoviesList = ({ movies, onMovieCardClick }) => {
  if (movies.length === 0) {
    return;
  }
  return (
    <MoviesGrid>
      {movies.map(
        ({ id, poster_path, original_title, vote_average, release_date }) => (
          <MovieItem key={id} onClick={onMovieCardClick}>
            <LinkToMovie id={id}>
              <Wrapper>
                <Poster
                  src={formatePhoto(poster_path)}
                  alt={original_title}
                  loading="lazy"
                  height="574"
                />
              </Wrapper>
              <Info>
                <Box display="flex" justifyContent="space-between">
                  <span>{original_title}</span>
                  <Year>{formateDate(release_date)}</Year>
                </Box>
                <Rating>{vote_average}</Rating>
              </Info>
            </LinkToMovie>
          </MovieItem>
        )
      )}
    </MoviesGrid>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      original_title: PropTypes.string.isRequired,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
  onMovieCardClick: PropTypes.func,
};

export default MoviesList;
