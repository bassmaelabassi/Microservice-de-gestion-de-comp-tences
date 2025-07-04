import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenue sur le système de suivi des compétences</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Cette application permet de gérer et suivre l'acquisition des compétences et sous-compétences 
          pour les collaborateurs de 404.js.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Compétences</h2>
            <p className="text-gray-700 mb-4">
              Consultez, ajoutez et gérez les compétences et leurs sous-compétences.
            </p>
            <Link 
              to="/competences" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Voir les compétences
            </Link>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 mb-3">Évaluations</h2>
            <p className="text-gray-700 mb-4">
              Marquez les sous-compétences comme validées ou non validées.
            </p>
            <Link 
              to="/competences" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            >
              Évaluer
            </Link>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-left">
          <h3 className="font-medium text-yellow-800 mb-2">Comment ça marche ?</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Une compétence est considérée comme "Validée" lorsque la majorité de ses sous-compétences sont validées</li>
            <li>Vous pouvez ajouter autant de sous-compétences que nécessaire</li>
            <li>Le statut est recalculé automatiquement après chaque modification</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;