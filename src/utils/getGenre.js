import pathExists from 'jrf-path-exists'

export default function getGenre(film) {

  const genre = pathExists(film, 'genre', []);
  return genre.join(', ');


}
