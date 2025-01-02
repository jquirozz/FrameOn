import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";

import { formatNumber } from "../utils/formatNumber";

import "./styles/Home.css";
import { FaUnsplash } from "react-icons/fa6";
import { IoImageOutline, IoFlameOutline } from "react-icons/io5";
import { AiOutlineCloudDownload } from "react-icons/ai";

export default function Home({ photos }) {
  return (
    <div className="Home">
      <HomeTop photo={photos[0]} />
      <HomeStats />
    </div>
  );
}

function HomeSection({ photo, children, className }) {
  if (photo)
    return (
      <section className="HomeSection">
        <div className="background">
          <img src={photo.urls?.small_s3} />
        </div>
        <main className={className}>{children}</main>
      </section>
    );
}

function HomeTop({ photo }) {
  return (
    <HomeSection photo={photo} className="top">
      <header>
        <h1>Frame On</h1>
        <div className="subtitle">
          <h2>Capture. Share. Inspire</h2>
          <img src="/logo/logo_transparent.png" />
        </div>
      </header>
      <footer>
        <SearchBar />
        <Link to="https://unsplash.com/" target="_BLANK">
          <FaUnsplash />
          <h3>Unsplash</h3>
        </Link>
      </footer>
    </HomeSection>
  );
}

function HomeStats() {
  const STATS = [
    {
      title: "photos",
      icon: <IoImageOutline />,
      count: formatNumber(6907700),
    },
    {
      title: "views",
      icon: <IoFlameOutline />,
      count: formatNumber(7564930086),
    },
    {
      title: "downloads",
      icon: <AiOutlineCloudDownload />,
      count: formatNumber(1253587096749),
    },
  ];

  return (
    <article className="HomeStats">
      {STATS.map((stat) => (
        <div className="stat" key={stat.title}>
          {stat.icon}
          <aside>
            <h2>{stat.count}</h2>
            <h3>{stat.title}</h3>
          </aside>
        </div>
      ))}
    </article>
  );
}
