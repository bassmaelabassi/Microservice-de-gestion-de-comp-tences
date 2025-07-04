import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import CompetenceList from './components/CompetenceList';
import CompetenceForm from './components/CompetenceForm';
import About from './components/About'; 
import { getCompetences, createCompetence, updateEvaluation, deleteCompetence, updateCompetence } from './services/api';

function App() {
  const [competences, setCompetences] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompetences();
  }, []);

  const fetchCompetences = async () => {
    try {
      const data = await getCompetences();
      setCompetences(data);
    } catch (error) {
      console.error('Error fetching competences:', error);
    }
  };

  const handleAddCompetence = async (competenceData) => {
    try {
      await createCompetence(competenceData);
      fetchCompetences();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding competence:', error);
    }
  };

  const handleUpdateEvaluation = async (id, sousCompetences) => {
    try {
      await updateEvaluation(id, sousCompetences);
      fetchCompetences();
    } catch (error) {
      console.error('Error updating evaluation:', error);
    }
  };

  const handleDeleteCompetence = async (id) => {
    try {
      await deleteCompetence(id);
      fetchCompetences();
    } catch (error) {
      console.error('Error deleting competence:', error);
    }
  };

  const handleEditCompetence = async (id, data) => {
    try {
      await updateCompetence(id, data);
      fetchCompetences();
    } catch (error) {
      console.error('Error editing competence:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/competences" element={
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">Gestion des Compétences</h1>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
                  >
                    {showForm ? 'Annuler' : 'Ajouter une compétence'}
                  </button>
                </div>

                {showForm && (
                  <CompetenceForm 
                    onSubmit={handleAddCompetence} 
                    onCancel={() => setShowForm(false)}
                  />
                )}

                <CompetenceList 
                  competences={competences}
                  onUpdateEvaluation={handleUpdateEvaluation}
                  onDelete={handleDeleteCompetence}
                  onEdit={handleEditCompetence}
                />
              </>
            } />
          </Routes>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;