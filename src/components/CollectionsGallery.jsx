import { Link } from "react-router-dom";

import "./styles/CollectionsGallery.css";

export default function CollectionsGallery({ collections }) {
  return (
    <div className="CollectionsGallery">
      {collections.map((collection) => (
        <Link key={collection.id} to={`/collection/${collection.id}`}>
          <img src={collection.cover_photo?.urls?.regular} />
          <footer>
            <div className="text">
              <h2>{collection.title}</h2>
              <h3>{collection.total_photos} Photos</h3>
            </div>
          </footer>
        </Link>
      ))}
    </div>
  );
}
