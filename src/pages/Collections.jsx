import { useState } from "react";

import CollectionsGallery from "../components/Gallery/CollectionsGallery";
import Loading from "../components/Loading";

import { useCollections } from "../hooks/useCollections";

import "./styles/Collections.css";

export default function Collections() {
  const [page, setPage] = useState(1);
  const { collections, loading, hasMore } = useCollections(page);

  if (loading) return <Loading />;

  return (
    <div className="Collections">
      <main>
        <CollectionsGallery
          collections={collections}
          page={page}
          setPage={setPage}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
}
