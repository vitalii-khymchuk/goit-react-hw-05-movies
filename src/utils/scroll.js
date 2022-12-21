const scrollDownTo = value => {
  if (value) {
    window.scrollTo({
      top: value + window.pageYOffset,
      behavior: 'smooth',
    });
  }
};

const updScrollPosition = pageName => {
  const currentPosition = JSON.stringify({ [pageName]: window.pageYOffset });
  sessionStorage.setItem('scrollPositions', currentPosition);
};

export { scrollDownTo, updScrollPosition };
