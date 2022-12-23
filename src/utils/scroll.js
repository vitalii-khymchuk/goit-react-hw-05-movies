const scrollDownTo = value => {
  if (value) {
    window.scrollTo({
      top: value + window.pageYOffset,
      behavior: 'smooth',
    });
  }
};

export { scrollDownTo };
