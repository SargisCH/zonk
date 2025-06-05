import Card from "../components/Card";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router";
const gameId = uuidv4();

export default function Home() {
  return (
    <main className="h-screen bg-linear-to-b from-purple-grad-from to-purple-grad-to flex-auto  flex items-center justify-center">
      <Card title="Practice" variant="outline">
        <div>
          <p className="text-gray-400 text-2xl mb-4">Play test round</p>
          <Link
            to={`/game/${gameId}`}
            className="text-gray-400 hover:underline"
          >
            Play
          </Link>
        </div>
      </Card>
    </main>
  );
}
