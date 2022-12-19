import styled from '@emotion/styled';

const MoviesGrid = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px 15.5px;
  margin-top: 60px;
`;

const MovieItem = styled.li`
  cursor: pointer;
  width: 394px;
`;

const Wrapper = styled.div`
  width: 394px;
  height: 574px;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Info = styled.div`
  font-size: 20px;
  line-height: 1.2;
  margin-top: 12px;
  max-width: 100%;
`;

const Year = styled.span`
  color: $accentColor;
  border-left: 2px solid $accentColor;
  padding-left: 4px;
`;

const Rating = styled.span`
  display: inline-block;
  border-radius: 5px;
  width: 40px;
  height: 20px;
  background-color: orange;
  text-align: center;
  color: white;
  font-size: 12px;
  line-height: 1, 7;
  /* margin-left: 8px; */
  padding-top: 3px;
`;

export { MoviesGrid, MovieItem, Wrapper, Poster, Info, Year, Rating };
