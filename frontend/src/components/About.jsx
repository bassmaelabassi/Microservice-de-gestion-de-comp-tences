const About = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">À propos de notre application</h1>
      
      <div className="prose prose-indigo">
        <p className="text-gray-700 mb-4">
          Cette application a été développée pour répondre aux besoins de suivi des compétences des collaborateurs de 404.js.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Fonctionnalités principales</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Gestion des compétences et sous-compétences</li>
          <li>Évaluation des acquis</li>
          <li>Calcul automatique du statut global</li>
          <li>Interface intuitive et responsive</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Notre équipe</h2>
        <p className="text-gray-700 mb-4">
          Nous sommes une équipe de développeurs passionnés par la création d'outils qui simplifient la gestion des compétences en entreprise.
        </p>
        
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-6">
          <h3 className="font-medium text-indigo-800 mb-2">Technologies utilisées</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>React.js pour le frontend</li>
            <li>Tailwind CSS pour le design</li>
            <li>Node.js et Express pour le backend</li>
            <li>MongoDB pour la base de données</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;