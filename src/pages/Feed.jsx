import { useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Masonry from "../components/Masonry";

import { usePhotos } from "../hooks/usePhotos";

import "./styles/Feed.css";

export default function Feed() {
  const [page, setPage] = useState(1);
  const { query } = useParams();
  const { photos, info } = usePhotos(query, page);

  return (
    <div className="Feed">
      <main id="infiniteScrollWrap">
        <InfiniteScroll
          dataLength={photos.length}
          next={() => setPage(page + 1)}
          hasMore={info.hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="infiniteScrollWrap"
        >
          <Masonry photos={photos} />
        </InfiniteScroll>
      </main>
    </div>
  );
}
