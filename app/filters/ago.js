import timeago from 'timeago.js';
export default app => {
  return value => {
    return timeago().format(value);
  }
}