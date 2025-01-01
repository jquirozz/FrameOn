import { useState } from "react";
import { useParams } from "react-router-dom";

import Gallery from "../Gallery";
import Loading from "../Loading";

import { useUserLikes } from "../../hooks/useUser";

export default function UserLikes() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { data, loading, hasMore } = useUserLikes(username, page);

  if (loading) return <Loading />;

  return (
    <div className="UserLikes">
      <Gallery photos={data} page={page} setPage={setPage} hasMore={hasMore} />
    </div>
  );
}
