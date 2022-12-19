import { ReviewItem } from './Reviews.styled';
import { Box } from 'components/Box';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import { useRef, useLayoutEffect } from 'react';
const { useEffect } = require('react');
const { useState } = require('react');
const { useParams } = require('react-router-dom');
const { default: theMovie } = require('services/theMovie');

const normalizeReviews = reviews =>
  reviews.map(({ author, content, id }) => ({ author, content, id }));

const ReviewsItems = ({ reviews }) =>
  reviews.map(({ author, content, id }) => (
    <ReviewItem key={id}>
      <b>Author: {author}</b>
      <p>{content}</p>
    </ReviewItem>
  ));

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

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
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
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const { data } = await theMovie.getReviews({ id: movieId, controller });
        setReviews(normalizeReviews(data.results));
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
    getReviews();
    return () => {
      controller.abort();
    };
  }, [yPos]);

  const shouldRenderContent = reviews !== null && reviews.length !== 0;
  const shouldRenderMessage = reviews !== null && reviews.length === 0;

  return (
    <>
      <Box as="ul" px="15px" minHeight="1000px" ref={ref}>
        {isLoading && <Loader />}
        {shouldRenderContent && <ReviewsItems reviews={reviews} />}
        {shouldRenderMessage && (
          <p>We don't have any reviews for this movie.</p>
        )}
      </Box>
    </>
  );
};
export default Reviews;
