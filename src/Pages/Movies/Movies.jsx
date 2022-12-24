import { useSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
  const [error, setError] = useState(null);
  const location = useLocation();
  const topPos = location.state?.offsetTop;

  useEffect(() => {
    if (error) {
      toast('Something went wrong. Please reload page...');
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (!movies?.length || !topPos) return;
    window.scroll({
      top: topPos - 120,
      behavior: 'smooth',
    });
  }, [topPos, movies]);

  useEffect(() => {
    const controller = new AbortController();
    const getMoviesByQuery = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        const data = await theMovie.getByQuery({ query, controller });
        if (!data.length) return;
        setMovies(data);
        setError(null);
      } catch (error) {
        setError(error);
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

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {movies !== null && movies.length !== 0 && <MoviesList movies={movies} />}
      {movies !== null && movies.length === 0 && (
        <img src={badRequestImg} alt="bad request" />
      )}
    </>
  );
};

export default Movies;
