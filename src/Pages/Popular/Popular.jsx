import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { normalizeResults } from 'utils/normalizeResponse';
import { Header } from './Popular.styled';
import MoviesList from 'components/MoviesList';
import Loader from 'components/Loader';
import theMovie from 'services/theMovie';
import { useLocation } from 'react-router-dom';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const topPos = location.state?.offsetTop;

  useEffect(() => {
    if (!movies.length || !topPos) return;
    window.scroll({
      top: topPos - 55,
      behavior: 'smooth',
    });
  }, [topPos, movies]);

  useEffect(() => {
    const controller = new AbortController();
    const getPopular = async () => {
      try {
        setIsLoading(true);
        const { data } = await theMovie.getPopular({ controller });
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
    getPopular();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header>Trending today:</Header>
      {isLoading && <Loader />}
      <MoviesList movies={movies} />
    </>
  );
};

export default Popular;
