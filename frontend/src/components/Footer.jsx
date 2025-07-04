const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivi des Compétences</h3>
            <p className="text-gray-400">
              Système de suivi d'acquisition des compétences pour les collaborateurs de 404.js.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Accueil</a></li>
              <li><a href="/competences" className="text-gray-400 hover:text-white transition">Compétences</a></li>
              <li><a href="/a-propos" className="text-gray-400 hover:text-white transition">À propos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;