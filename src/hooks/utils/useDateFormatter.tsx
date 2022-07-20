import moment from 'moment';

interface DateFormatter {
  toLocalShortDate: (date: string) => string;
}

export const useDateFormatter = (): DateFormatter => {
  const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const toLocalShortDate = (date: string): string => {
    return capitalizeFirstLetter(moment(date).local().format('MMM DD YYYY'));
  };

  return { toLocalShortDate };
};
