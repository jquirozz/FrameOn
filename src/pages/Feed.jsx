import { useState } from "react";
import { useParams } from "react-router-dom";

import ActionHeader from "../components/ActionHeader";
import GalleryPhotos from "../components/GalleryPhotos";

import { useSearch } from "../hooks/useSearch";

import "./styles/Feed.css";

export default function Feed() {
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("relevant");
  const { photos, total, hasMore, loading } = useSearch(query, page, orderBy);

  return (
    <div className="Feed">
      <ActionHeader
        query={query}
        total={total}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <GalleryPhotos
        data={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
