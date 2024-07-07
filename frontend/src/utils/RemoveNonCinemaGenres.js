const RemoveUnwantedGenres = (genres) => {
  if (!Array.isArray(genres)) {
    console.error('Invalid input: genres is not an array', genres);
    return [];
  }

  return genres.filter(
    (genre) =>
      genre.name !== 'Documentary' &&
      genre.name !== 'TV Movie' &&
      genre.name !== 'Western'
  );
};

export default RemoveUnwantedGenres;