import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Feed from "./pages/Feed";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";

import User from "./pages/User";
import UserPhotos from "./components/User/UserPhotos";
import UserCollections from "./components/User/UserCollections";
import UserLikes from "./components/User/UserLikes";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/feed" element={<Feed />}>
              <Route path=":query" element={<Feed />} />
            </Route>

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
