import Searchbar from 'components/Searchbar';
import MoviesList from 'components/MoviesList';
import theMovie from 'services/theMovie';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';
import badRequestImg from 'images/badRequestImg.png';
import Loader from 'components/Loader';

const normalizeResults = data =>
  data.map(
    ({ id, poster_path, original_title, vote_average, release_date }) => ({
      id,
      poster_path,
      original_title,
      vote_average,
      release_date,
    })
  );

const savePosition = () => {
  sessionStorage.setItem('moviesPageYPosition', window.pageYOffset);
};

const Movies = () => {
  const [params] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState(() => params.get('query'));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const yPos = sessionStorage.getItem('moviesPageYPosition');
    if (yPos !== null && movies?.length !== 0) {
      window.scrollTo(0, yPos);
    }
  }, [movies]);

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

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {movies !== null && movies.length !== 0 && (
        <MoviesList savePosition={savePosition} movies={movies} />
      )}
      {movies !== null && movies.length === 0 && (
        <img src={badRequestImg} alt="bad request image" />
      )}
    </>
  );
};

export default Movies;
