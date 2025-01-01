import { useState } from "react";
import { useParams } from "react-router-dom";

import CollectionsGallery from "../CollectionsGallery";
import Loading from "../Loading";

import { useUserCollections } from "../../hooks/useUser";

export default function UserCollections() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { data, loading, hasMore } = useUserCollections(username, page);

  if (loading) return <Loading />;

  return (
    <div className="UserCollections">
      <CollectionsGallery
        collections={data}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
