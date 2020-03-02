export default function getImgFilm({film, width = 400, original = false}) {

  const img = film.img;
  if (img.includes('dmik')) return img;

  // return `https://image.tmdb.org/t/p/w200${img}`;
  if (original) return `https://image.tmdb.org/t/p/original${img}`;
  return `https://image.tmdb.org/t/p/w${width}${img}`;
}
