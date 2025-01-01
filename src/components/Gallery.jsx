import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import Image from "./Image";
import Loading from "./Loading";

import "./styles/Gallery.css";

export default function Gallery({ photos, page, setPage, hasMore }) {
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handlePhotoView = (photo) => {
    if (!isOpen) {
      setSelected(photo);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <div className="Gallery">
      <InfiniteScroll
        dataLength={photos.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <main>
          {photos?.map((photo) => (
            <div key={photo.id} onClick={() => handlePhotoView(photo)}>
              <Image photo={photo} source={photo.urls?.small_s3} />
            </div>
          ))}
        </main>
      </InfiniteScroll>
      {isOpen && (
        <Post photo={selected} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
