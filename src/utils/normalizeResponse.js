const normalizeResults = data =>
  data.map(
    ({ id, poster_path, original_title, vote_average, release_date }) => ({
      id,
      poster_path,
      original_title,
      vote_average,
      release_date,
    })
  );

const normalizeCast = cast =>
  cast.map(({ id, name, character, profile_path }) => ({
    id,
    name,
    character,
    profile_path,
  }));

const normalizeReviews = reviews =>
  reviews.map(({ author, content, id }) => ({ author, content, id }));

export { normalizeResults, normalizeCast, normalizeReviews };
