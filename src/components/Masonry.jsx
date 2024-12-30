import { useState } from "react";

import Post from "./Post";
import Image from "./Image";

import "./styles/Masonry.css";

export default function Masonry({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const handlePhotoView = (photo) => {
    if (!isOpen) {
      setSelected(photo);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="Masonry">
      <section className="gallery">
        {photos?.map((photo) => (
          <div
            key={photo.id}
            className="wrap"
            onClick={() => handlePhotoView(photo)}
            style={{
              aspectRatio: photo.width / photo.height,
            }}
          >
            <Image photo={photo} source={photo.urls?.small_s3} />
          </div>
        ))}
      </section>
      {isOpen && (
        <Post photo={selected} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
