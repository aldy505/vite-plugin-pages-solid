import { useParams } from 'solid-app-router';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default () => {
  const params = useParams();
  return <p>blog/[id].jsx: {params.id}</p>;
};
