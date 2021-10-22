import { useParams } from 'solid-app-router';

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
