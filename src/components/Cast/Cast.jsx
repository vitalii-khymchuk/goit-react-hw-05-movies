import { Box } from 'components/Box';
import { CastGrid, Photo } from './Cast.styled';
import { formatePhoto } from 'utils/formatting';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import { useRef } from 'react';
const { useEffect, useLayoutEffect } = require('react');
const { useState } = require('react');
const { useParams } = require('react-router-dom');
const { default: theMovie } = require('services/theMovie');

const normalizeCast = cast =>
  cast.map(({ id, name, character, profile_path }) => ({
    id,
    name,
    character,
    profile_path,
  }));

const scrollDownTo = value => {
  if (!value) {
    return;
  }
  const navHeight = 70;
  window.scrollTo({
    top: value + window.pageYOffset - navHeight,
    behavior: 'smooth',
  });
};

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [yPos, setYPos] = useState(null);
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) {
      return;
    }
    const { top } = element.getBoundingClientRect();
    setYPos(top);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getCast = async () => {
      try {
        setIsLoading(true);
        const { data } = await theMovie.getCredits({ id: movieId, controller });
        setCast(normalizeCast(data.cast));
        scrollDownTo(yPos);
      } catch (error) {
        if (error.message !== 'canceled') {
          toast('Something went wrong. Please reload page...');
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
    return () => {
      controller.abort();
    };
  }, [yPos]);

  const shouldRender = cast !== null && cast.length !== 0;

  return (
    <>
      <CastGrid ref={ref}>
        {isLoading && <Loader />}
        {shouldRender &&
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
