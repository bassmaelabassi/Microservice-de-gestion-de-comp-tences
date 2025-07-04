import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">SuiviCompétences</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Accueil
            </Link>
            <Link 
              to="/competences" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Compétences
            </Link>
            <Link 
              to="/a-propos" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              À propos
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Ouvrir le menu mobile"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden ${menuOpen ? '' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
            Accueil
          </Link>
          <Link to="/competences" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
            Compétences
          </Link>
          <Link to="/a-propos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
            À propos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;