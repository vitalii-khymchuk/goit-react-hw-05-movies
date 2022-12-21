import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { Box } from 'components/Box';
import { NavItem, NavLinkStyled } from './layout.styled';
import Loader from 'components/Loader';

const Layout = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  return (
    <Box display="grid" gridTemplateRows="60px 1fr">
      <Box
        as="header"
        bg="#3f51b5"
        position="sticky"
        top="0"
        left="0"
        zIndex="1101"
      >
        <nav>
          <Box as="ul" display="flex">
            <NavItem>
              <NavLinkStyled to="/">Home</NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="movies" end>
                Movies
              </NavLinkStyled>
            </NavItem>
            {location.pathname !== '/' && (
              <NavItem>
                <NavLinkStyled to={backLinkHref} end>
                  GoBack
                </NavLinkStyled>
              </NavItem>
            )}
          </Box>
        </nav>
      </Box>
      <Box as="main">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
