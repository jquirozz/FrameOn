import { useState } from "react";

import GalleryCollections from "../components/GalleryCollections";

import { useCollections } from "../hooks/useCollections";

export default function Collections() {
  const [page, setPage] = useState(1);
  const { collections, loading, hasMore } = useCollections(page);

  return (
    <div className="Collections">
      <GalleryCollections
        data={collections}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
