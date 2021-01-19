import { language } from './browser';

// Pollyfill (mobile safari doesn't support `Intl.RelativeTimeFormat` at the moment)
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill-locales';

// https://twitter.com/addyosmani/status/1261929447122513921/photo/1
export const relativeTime = (timestamp: number) => {
  const formatter = new (Intl as any).RelativeTimeFormat(language, {
    numeric: 'auto',
    style: 'long'
  });
  const ms = timestamp - Date.now();
  const years = Math.ceil(ms / 31536e6);
  if (years) return formatter.format(years, 'year');
  const months = Math.ceil(ms / 168e6);
  if (months) return formatter.format(months, 'month');
  const days = Math.ceil(ms / 864e5);
  if (days) return formatter.format(days, 'day');
  const hours = Math.ceil(ms / 36e5);
  if (hours) return formatter.format(hours, 'hour');
  const minutes = Math.ceil(ms / 6e4);
  if (minutes) return formatter.format(minutes, 'minute');
  const seconds = Math.ceil(ms / 1e3);
  return formatter.format(seconds, 'second');
};
