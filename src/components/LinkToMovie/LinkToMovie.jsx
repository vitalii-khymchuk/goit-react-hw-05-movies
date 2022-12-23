import { useLocation, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

const LinkToMovie = ({ id, children }) => {
  const [offsetTop, setOffsetTop] = useState(0);
  const linkRef = useRef();
  const location = useLocation();
  useEffect(() => {
    if (!linkRef.current) return;
    setOffsetTop(linkRef.current.offsetTop);
  }, []);
  const pathToMovie =
    location.pathname === '/movies' ? id.toString() : `movies/${id}`;
  return (
    <Link ref={linkRef} to={pathToMovie} state={{ from: location, offsetTop }}>
      {children}
    </Link>
  );
};

export default LinkToMovie;
