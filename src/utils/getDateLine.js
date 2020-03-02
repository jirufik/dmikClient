import moment from "moment";
import ca from "quasar/lang/ca";

export default function getDateLine({countDays}) {

  const days = [];

  for (let i = 0; i < countDays; i++) {

    const date = moment().add(i, 'days');

    if (i === 0) {

      days.push({
        label: 'Сегодня',
        date
      });

      continue;
    }

    if (i === 1) {

      days.push({
        label: 'Завтра',
        date
      });

      continue;
    }

    days.push({
      label: `${getStr(date.day())} ${date.format('DD')}`,
      date
    });

  }

  return days;

}

function getStr(day) {

  switch (day) {
    case 0: {
      return 'Вс'
    }
    case 1: {
      return 'Пн'
    }
    case 2: {
      return 'Вт'
    }
    case 3: {
      return 'Ср'
    }
    case 4: {
      return 'Чт'
    }
    case 5: {
      return 'Пт'
    }
    case 6: {
      return 'Сб'
    }
  }

  return '';

}
