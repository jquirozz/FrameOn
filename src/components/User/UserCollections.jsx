import { useState } from "react";
import { useParams } from "react-router-dom";

import CollectionsGallery from "../Gallery/CollectionsGallery";

import { useUserCollections } from "../../hooks/useUser";

export default function UserCollections() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { data, hasMore, loading } = useUserCollections(username, page);

  return (
    <div className="UserCollections">
      <CollectionsGallery
        collections={data}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
