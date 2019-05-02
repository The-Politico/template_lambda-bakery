export default () => {
  return fetch('./data.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
    d => d.json()
  ).catch(
    e => console.error(e)
  );
};
