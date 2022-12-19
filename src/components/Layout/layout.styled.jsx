import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const NavItem = styled.li`
  & + & {
    margin-left: 15px;
  }
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

export { NavItem, NavLinkStyled };
