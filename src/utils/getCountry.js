import pathExists from 'jrf-path-exists'

export default function getCountry(film) {

  const country = pathExists(film, 'country', []);
  return country.join(', ');


}
