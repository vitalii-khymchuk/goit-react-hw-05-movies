import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Poster = styled.img`
  display: block;
  border-radius: 5px;
  min-width: 340px;
  height: 478px;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 30px;
  line-height: 1.17;
`;

const MovieInfo = styled.div`
  padding: 15px;
  text-align: start;
  max-height: 472px;
  min-width: 412px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  min-width: 108px;
`;

const InfoDetails = styled.p`
  font-weight: 600;
  min-width: 108px;
`;

const AboutMovieTitle = styled.h3`
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 8px;
`;

const AboutMovieText = styled.p`
  line-height: 1.67;
  margin-bottom: 20px;
  overflow-y: scroll;
  max-height: 200px;
`;

const LinksList = styled.ul`
  position: sticky;
  top: 35px;
  display: flex;
  background-color: #3f51b5;
  height: 64px;
  align-items: center;
  width: 100%;
`;

const NavLinkStyled = styled(NavLink)`
  padding: 5px;
  font-size: 16px;
  color: white;
  border-radius: 10px;
  &.active {
    color: orange;
  }

  &:hover:not(.active),
  &:focus:not(.active) {
    color: orange;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export {
  Poster,
  Title,
  MovieInfo,
  InfoItem,
  InfoDetails,
  AboutMovieTitle,
  AboutMovieText,
  LinksList,
  NavLinkStyled,
};
