import "./styles/ActionHeader.css";
import { IoStarOutline, IoCaretDown } from "react-icons/io5";

export default function ActionHeader({ query, total, orderBy, setOrderBy }) {
  const title = query || "Frame on";
  const subtitle = query ? `${total} Photos` : "Capture. Share. Inspire.";

  const ORDER_LIST = [
    { title: "relevant", icon: <IoStarOutline /> },
    { title: "latest", icon: <IoCaretDown /> },
  ];

  const handleOrderChange = (newOrder) => {
    if (orderBy !== newOrder) setOrderBy(newOrder);
  };

  return (
    <header className="ActionHeader">
      <main>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </main>
      <aside>
        {ORDER_LIST.map((order) => (
          <button
            className={orderBy !== order.title ? "active" : ""}
            onClick={() => handleOrderChange(order.title)}
            key={order.title}
          >
            <h4>{order.title}</h4>
            {order.icon}
          </button>
        ))}
      </aside>
    </header>
  );
}
