import { useState } from "react";
import { useParams } from "react-router-dom";

import ActionHeader from "../components/ActionHeader";
import PhotosGallery from "../components/Gallery/PhotosGallery";

import { useSearch } from "../hooks/useSearch";

import "./styles/Feed.css";

export default function Feed() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("relevant");
  const { query } = useParams();
  const { photos, total, hasMore, loading } = useSearch(query, page, orderBy);

  return (
    <div className="Feed">
      <ActionHeader
        query={query}
        total={total}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <PhotosGallery
        photos={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
