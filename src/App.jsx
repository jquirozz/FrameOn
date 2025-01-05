import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import NavBar from "./components/NavBar";

import NotFound from "./components/NotFound";

import Feed from "./pages/Feed";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";

import User from "./pages/User";
import UserPhotos from "./components/UserPhotos";
import UserCollections from "./components/UserCollections";
import UserLikes from "./components/UserLikes";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="screen">
          <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Feed />} />
            <Route path="search/:query" element={<Feed />} />

            <Route path="/user/:username" element={<User />}>
              <Route path="photos" element={<UserPhotos />} />
              <Route path="collections" element={<UserCollections />} />
              <Route path="likes" element={<UserLikes />} />

              <Route index element={<RedirectToPhotos />} />
            </Route>

            <Route path="/collections" element={<Collections />} />

            <Route path="/collection/:collectionId" element={<Collection />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

function RedirectToPhotos() {
  const { username } = useParams();
  return <Navigate to={`/user/${username}/photos`} replace />;
}
