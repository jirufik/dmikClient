import pathExists from 'jrf-path-exists'
import moment from "moment";

export default function getLastTimeFilm(film) {

  if (!film) return;

  let lastTime = null;
  const schedules = pathExists(film, 'schedule', []);

  for (const schedule of schedules) {

    const date = moment(schedule.date);

    if (!lastTime) lastTime = moment(date);
    if (lastTime < date) lastTime = date;

  }

  return lastTime;

}
