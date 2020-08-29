import pathExists from 'jrf-path-exists'
import moment from "moment";

export default function getLastTimeFilm(film) {

  if (!film) return;

  let firstTime = null;
  const schedules = pathExists(film, 'schedule', []);

  for (const schedule of schedules) {

    const date = moment(schedule.date);

    if (!firstTime) firstTime = moment(date);

    const isEarlier = firstTime > date && date >= moment();
    if (isEarlier) firstTime = date;

  }

  return firstTime;

}
