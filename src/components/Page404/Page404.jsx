import { Box } from 'components/Box';
import Image404 from 'images/404.jpg';

const Page404 = () => (
  <Box display="flex" justifyContent="center">
    <img src={Image404} alt="Page not found" />
  </Box>
);
export default Page404;
