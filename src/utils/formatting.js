import fallbackPhoto from 'images/placeholder.jpg';

const formatePhoto = photo =>
  photo ? `https://image.tmdb.org/t/p/w500/${photo}` : fallbackPhoto;

const formateDate = dateString => {
  if (!dateString) {
    return 'no release date';
  }
  const parsedDate = Date.parse(dateString);
  return new Date(parsedDate).getFullYear();
};

const formateVote = vote => `${(Number(vote) * 10).toFixed()}%`;

const formateGenres = genres => genres.map(({ name }) => name).join(', ');

export { formatePhoto, formateDate, formateVote, formateGenres };
