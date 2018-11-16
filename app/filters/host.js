import url from 'url';
export default app => {
  return value => {
    return url.parse(value).host;
  }
}