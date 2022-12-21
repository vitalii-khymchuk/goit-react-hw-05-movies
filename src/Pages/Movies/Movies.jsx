import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updScrollPosition } from 'utils/scroll';
import { normalizeResults } from 'utils/normalizeResponse';
import Searchbar from 'components/Searchbar';
import MoviesList from 'components/MoviesList';
import theMovie from 'services/theMovie';
import badRequestImg from 'images/badRequestImg.png';
import Loader from 'components/Loader';

const Movies = () => {
  const [params] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState(() => params.get('query'));
  const [isLoading, setIsLoading] = useState(false);
  const [yPos] = useState(() => {
    const positions = sessionStorage.getItem('scrollPositions');
    return JSON.parse(positions)?.moviesPage ?? 0;
  });

  useEffect(() => {
    if (movies?.length !== 0) {
      window.scrollTo(0, yPos);
    }
  }, [yPos, movies]);

  useEffect(() => {
    const controller = new AbortController();
    const getMoviesByQuery = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        const { data } = await theMovie.getByQuery({ query, controller });
        setMovies(normalizeResults(data.results));
      } catch (error) {
        if (error.message !== 'canceled') {
          toast('Something went wrong. Please reload page...');
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByQuery();
    return () => {
      controller.abort();
    };
  }, [query]);

  const onSubmit = query => {
    setMovies(null);
    setQuery(query);
  };

  const onMovieCardClick = () => updScrollPosition('moviesPage');

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {movies !== null && movies.length !== 0 && (
        <MoviesList onMovieCardClick={onMovieCardClick} movies={movies} />
      )}
      {movies !== null && movies.length === 0 && (
        <img src={badRequestImg} alt="bad request" />
      )}
    </>
  );
};

export default Movies;
