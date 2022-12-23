import { Box } from 'components/Box';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { formateDate, formateVote, formateGenres } from 'utils/formatting';
import theMovie from 'services/theMovie';
import {
  Poster,
  Title,
  MovieInfo,
  InfoItem,
  InfoDetails,
  AboutMovieTitle,
  AboutMovieText,
  LinksList,
  NavLinkStyled,
} from './MovieDetails.styled';
import { useRef } from 'react';

const MovieDetails = () => {
  const location = useLocation();
  const linksRef = useRef();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const getDetails = async () => {
      try {
        const { data } = await theMovie.getDetails({ id: movieId, controller });
        setMovie(data);
      } catch (error) {
        if (error.message !== 'canceled') {
          toast('Something went wrong. Please reload page...');
          console.log(error);
        }
      }
    };
    getDetails();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (movie === null) {
    return;
  }

  const {
    original_title,
    overview,
    poster_path,
    release_date,
    vote_average,
    genres,
  } = movie;

  return (
    <>
      <Box display="flex" p="15px" width="806px">
        <Poster
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
          loading="lazy"
        />
        <MovieInfo>
          <Title>{original_title}</Title>
          <ul>
            <InfoItem>
              <InfoDetails>Vote</InfoDetails>
              <p>
                <span>{formateVote(vote_average)}</span>
              </p>
            </InfoItem>
            <InfoItem>
              <InfoDetails>Release date</InfoDetails>
              <p>{formateDate(release_date)}</p>
            </InfoItem>
            <InfoItem>
              <InfoDetails>Genre</InfoDetails>
              <p>{formateGenres(genres)}</p>
            </InfoItem>
          </ul>
          <AboutMovieTitle>About</AboutMovieTitle>
          <AboutMovieText>{overview}</AboutMovieText>
        </MovieInfo>
      </Box>
      <LinksList ref={linksRef}>
        <li>
          <NavLinkStyled to="cast" state={{ ...location.state }}>
            Cast
          </NavLinkStyled>
        </li>
        <li>
          <NavLinkStyled to="reviews" state={{ ...location.state }}>
            Reviews
          </NavLinkStyled>
        </li>
      </LinksList>
      <Outlet context={linksRef} />
    </>
  );
};

export default MovieDetails;
