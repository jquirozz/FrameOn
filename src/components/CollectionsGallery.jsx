import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import Image from "./Image";
import Loading from "./Loading";

import "./styles/CollectionsGallery.css";

export default function CollectionsGallery({
  collections,
  page,
  setPage,
  hasMore,
}) {
  return (
    <div className="CollectionsGallery">
      <InfiniteScroll
        dataLength={collections.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="collections">
          {collections.map((collection) => (
            <Link key={collection.id} to={`/collection/${collection.id}`}>
              <Image
                photo={collection.cover_photo}
                source={collection.cover_photo?.urls?.regular}
              />
              <footer>
                <div className="text">
                  <h2>{collection.title}</h2>
                  <h3>{collection.total_photos} Photos</h3>
                </div>
              </footer>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
