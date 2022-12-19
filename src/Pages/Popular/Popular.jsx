import { Header } from './Popular.styled';
import MoviesList from 'components/MoviesList';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
const { useEffect } = require('react');
const { useState } = require('react');
const { default: theMovie } = require('services/theMovie');

const savePosition = () => {
  sessionStorage.setItem('popularPageYPosition', window.pageYOffset);
};

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

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const yPos = sessionStorage.getItem('popularPageYPosition');
    if (yPos !== null && movies?.length !== 0) {
      window.scrollTo(0, yPos);
    }
  }, [movies]);
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
      <MoviesList savePosition={savePosition} movies={movies} />
    </>
  );
};

export default Popular;
