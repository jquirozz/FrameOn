import { useState } from "react";
import { Blurhash } from "react-blurhash";

export default function Image({ photo, source }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <picture
      style={{
        aspectRatio: photo.width / photo.height,
      }}
    >
      {!isLoaded && photo.blur_hash && (
        <Blurhash
          height={photo.height}
          width={photo.width}
          hash={photo.blur_hash}
        />
      )}
      <img
        onLoad={handleImageLoad}
        src={source}
        style={{
          display: isLoaded ? "block" : "none",
        }}
      />
    </picture>
  );
}
