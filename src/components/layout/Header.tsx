
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/70 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <Link to="/" className="text-2xl font-bold">Entanglion</Link>
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:text-blue-300 transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-300 transition-colors">
              <Link to="/game">Game</Link>
            </li>
            <li className="hover:text-blue-300 transition-colors">
              <Link to="/resources">Resources</Link>
            </li>
            <li className="hover:text-blue-300 transition-colors">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
