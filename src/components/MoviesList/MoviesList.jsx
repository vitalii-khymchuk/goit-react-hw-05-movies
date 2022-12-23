import PropTypes from 'prop-types';
import { MoviesGrid } from 'components/MoviesList/MoviesList.styled';
import MovieItem from 'components/MovieItem';

const MoviesList = ({ movies }) => {
  if (movies.length === 0) return;
  return (
    <MoviesGrid>
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </MoviesGrid>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MoviesList;
