import moment from "moment";

export default function getDates(schedule) {

  let dates = [...schedule];
  dates = dates.filter(el => moment(el.date) >= moment());
  dates = dates.sort((a, b) => new Date(a.date) - new Date((b.date)));

  if (!dates.length) return [];

  const days = [];
  let day = [];
  let date = moment(dates[0].date).startOf('day');

  for (const ticket of dates) {

    const ticketDate = moment(ticket.date).startOf('day');
    const diff = ticketDate.diff(date, 'days');

    if (!diff) {

      day.push({...ticket});

    } else {

      days.push([...day]);
      day = [];
      date = moment(ticket.date).startOf('day');
      day.push({...ticket});

    }

  }

  days.push([...day]);

  return days;

}
