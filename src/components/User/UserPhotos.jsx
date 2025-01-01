import { useState } from "react";
import { useParams } from "react-router-dom";

import Gallery from "../Gallery";
import Loading from "../Loading";

import { useUserPhotos } from "../../hooks/useUser";

export default function UserPhotos() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { data, loading, hasMore } = useUserPhotos(username, page);

  if (loading) return <Loading />;

  return (
    <div className="UserPhotos">
      <Gallery photos={data} page={page} setPage={setPage} hasMore={hasMore} />
    </div>
  );
}
