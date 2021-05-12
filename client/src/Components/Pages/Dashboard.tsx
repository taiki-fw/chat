import { useContext } from "react";
import { Link } from "react-router-dom";
import { CTX } from "../../Store";

export function Dashboard() {
  const { allChats } = useContext(CTX);
  const topics = Object.keys(allChats);

  return (
    <div>
      <h4>Chat App</h4>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <Link to={`/chat/${topic}`}>
              <p>{topic}</p>
              {/* chat内容の最後のメッセージを表示 */}
              <p>{allChats[topic].slice(-1)[0].msg}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
