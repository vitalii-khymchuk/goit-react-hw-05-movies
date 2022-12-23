import PropTypes from 'prop-types';
import { formateDate, formatePhoto } from 'utils/formatting';
import { Box } from 'components/Box';
import {
  MovieItemStyled,
  Wrapper,
  Poster,
  Info,
  Year,
  Rating,
} from './MovieItem.styled';
import LinkToMovie from 'components/LinkToMovie';

const MovieItem = ({
  movie: { id, poster_path, original_title, vote_average, release_date },
  onMovieCardClick,
}) => (
  <MovieItemStyled>
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
  </MovieItemStyled>
);

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
  }),
};

export default MovieItem;
