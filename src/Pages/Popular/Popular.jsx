import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updScrollPosition } from 'utils/scroll';
import { normalizeResults } from 'utils/normalizeResponse';
import { Header } from './Popular.styled';
import MoviesList from 'components/MoviesList';
import Loader from 'components/Loader';
import theMovie from 'services/theMovie';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Код нижче відповідає за відновлення положення скролу, готового рішення я не знайшов.
  // В ідеалі я хотів би зберігати позицію скролу коли компонент розмонтовується,
  // але ніяк не зміг написати код який спрацювував би тільки при розмонтуванні
  // (не спрацьовуючи при цьому на першому рендері, коли скрол = 0),
  // тому я привязав збереження позиції скролу до кліку по фільмові.
  const [yPos] = useState(() => {
    const positions = sessionStorage.getItem('scrollPositions');
    return JSON.parse(positions)?.popularPage ?? 0;
  });
  useEffect(() => {
    if (movies?.length !== 0) {
      window.scrollTo(0, yPos);
      sessionStorage.setItem('scrollPositions', null);
    }
  }, [movies, yPos]);

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

  const onMovieCardClick = () => updScrollPosition('popularPage');
  return (
    <>
      <Header>Trending today:</Header>
      {isLoading && <Loader />}
      <MoviesList onMovieCardClick={onMovieCardClick} movies={movies} />
    </>
  );
};

export default Popular;
