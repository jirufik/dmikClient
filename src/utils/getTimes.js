import moment from "moment";
import pathExists from 'jrf-path-exists'

export default function getTimes(scheduleOfDay) {

  if (!scheduleOfDay) return {};

  const schedule = {};

  let tickets = [...scheduleOfDay];
  tickets = tickets.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const ticket of tickets) {

    const date = moment(ticket.date);
    if (date < moment()) continue;

    const time = date.format('HH:mm');
    if (!schedule[time]) schedule[time] = {time, date: ticket.date, tickets: []};

    const cost = ticket.cost;
    const hall = ticket.hall;
    const hallDescription = ticket.hallDescription;
    const ticketDescription = ticket.ticketDescription;

    schedule[time].tickets.push({
      cost,
      hall,
      hallDescription,
      ticket: ticket.ticket,
      ticketDescription
    });

  }

  return schedule;

}
