import { useState } from "react";

import CollectionsGallery from "../components/Gallery/CollectionsGallery";

import { useCollections } from "../hooks/useCollections";

import "./styles/Collections.css";

export default function Collections() {
  const [page, setPage] = useState(1);
  const { collections, loading, hasMore } = useCollections(page);

  return (
    <div className="Collections">
      <CollectionsGallery
        collections={collections}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
