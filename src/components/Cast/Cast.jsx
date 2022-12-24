import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatePhoto } from 'utils/formatting';
import { scrollDownTo } from 'utils/scroll';
import { CastGrid, Photo } from './Cast.styled';
import theMovie from 'services/theMovie';

const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const linksRef = useOutletContext().current;

  useEffect(() => {
    if (error) {
      toast('Something went wrong. Please reload page...');
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (linksRef) {
      const { top } = linksRef.getBoundingClientRect();
      const headerHeight = 35;
      scrollDownTo(top - headerHeight);
    }
  }, [linksRef]);

  useEffect(() => {
    const controller = new AbortController();
    const getCast = async () => {
      try {
        const data = await theMovie.getCredits({ id: movieId, controller });
        if (!data.length) return;
        setCast(data);
        setError(null);
      } catch (error) {
        setError(error);
      }
    };
    getCast();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <>
      <CastGrid>
        {cast !== null &&
          cast.length !== 0 &&
          cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <Photo src={formatePhoto(profile_path)} alt={name} />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
      </CastGrid>
    </>
  );
};
export default Cast;
