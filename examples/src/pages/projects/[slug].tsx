import { useParams } from 'solid-app-router';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function Slug() {
  const params = useParams<{ slug: string }>();
  return (
    <>
      <p>Slug page</p>
      <p>Slug: {params.slug}</p>
    </>
  );
}

export default Slug;
