import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { scrollDownTo } from 'utils/scroll';
import { Box } from 'components/Box';
import { ReviewItem } from './Reviews.styled';
import theMovie from 'services/theMovie';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
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
    const getReviews = async () => {
      try {
        const data = await theMovie.getReviews({ id: movieId, controller });
        setReviews(data);
        setError(null);
      } catch (error) {
        setError(error);
      }
    };
    getReviews();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  const shouldRenderContent = reviews !== null && reviews.length !== 0;
  const shouldRenderMessage = reviews !== null && reviews.length === 0;

  return (
    <>
      <Box as="ul" px="15px" minHeight="1000px">
        {shouldRenderContent &&
          reviews.map(({ author, content, id }) => (
            <ReviewItem key={id}>
              <b>Author: {author}</b>
              <p>{content}</p>
            </ReviewItem>
          ))}
        {shouldRenderMessage && (
          <p>We don't have any reviews for this movie.</p>
        )}
      </Box>
    </>
  );
};
export default Reviews;
