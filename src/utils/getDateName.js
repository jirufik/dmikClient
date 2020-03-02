import moment from "moment";

export default function getDateName(date) {

  if (!date) return '';

  const diff = moment(date).startOf('day').diff(moment().startOf('day'), 'days');

  if (diff < 0) return '';
  if (diff === 0) return 'сегодня';
  if (diff === 1) return 'завтра';

  moment.locale('ru');

  return `${getStr(moment(date).day())} ${moment(date).format('DD MMMM')}`.toLowerCase();

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

