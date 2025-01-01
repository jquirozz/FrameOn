import { useState } from "react";
import { useParams } from "react-router-dom";

import CollectionsGallery from "../CollectionsGallery";
import Loading from "../Loading";

import { useUserCollections } from "../../hooks/User/useUserCollections";

export default function UserCollections() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { collections, loading, hasMore } = useUserCollections(username, page);

  if (loading) return <Loading />;

  return (
    <div className="UserCollections">
      <CollectionsGallery
        collections={collections}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
