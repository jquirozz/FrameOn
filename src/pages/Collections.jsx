import CollectionsGallery from "../components/CollectionsGallery";
import Loading from "../components/Loading";

import { useCollections } from "../hooks/useCollections";

import "./styles/Collections.css";

export default function Collections() {
  const { collections, loading } = useCollections();

  if (loading) return <Loading />;

  return (
    <div className="Collections">
      <main>
        <CollectionsGallery collections={collections} />
      </main>
    </div>
  );
}
