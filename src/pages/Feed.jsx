import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Masonry from "../components/Masonry";

import { usePhotos } from "../hooks/usePhotos";

import "./styles/Feed.css";

export default function Feed() {
  const { query } = useParams();
  const { photos } = usePhotos(query);

  return (
    <div className="Feed">
      <NavBar />
      <main>
        <Masonry photos={photos} />
      </main>
    </div>
  );
}
