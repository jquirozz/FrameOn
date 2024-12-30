import CollectionsGallery from "../components/CollectionsGallery";

import { useCollections } from "../hooks/useCollections";

import "./styles/Collections.css";

export default function Collections() {
  const { collections, loading } = useCollections();

  return (
    <div className="Collections">
      <main>
        <CollectionsGallery collections={collections} />
      </main>
    </div>
  );
}
