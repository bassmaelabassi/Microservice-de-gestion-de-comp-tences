import { useState } from 'react';
import EvaluationForm from './EvaluationForm';
import CompetenceForm from './CompetenceForm';
import { resolveTie } from '../services/api';

const CompetenceList = ({ competences, onUpdateEvaluation, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loadingTie, setLoadingTie] = useState(false);
  const [errorTie, setErrorTie] = useState('');

  const handleEditClick = (competence) => {
    setEditMode(true);
    setEditData(competence);
    setEditingId(competence._id);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData(null);
    setEditingId(null);
  };

  const handleSubmitEdit = (data) => {
    onEdit(editingId, data);
    setEditMode(false);
    setEditData(null);
    setEditingId(null);
  };

  const handleSubmitEvaluation = (id, sousCompetences) => {
    onUpdateEvaluation(id, sousCompetences);
    setEditingId(null);
  };

  const handleResolveTie = async (competenceId, subCompetenceId) => {
    setLoadingTie(true);
    setErrorTie('');
    try {
      await resolveTie(competenceId, subCompetenceId);
      window.location.reload();
    } catch (err) {
      setErrorTie(err.response?.data?.message || 'Erreur lors de la résolution.');
    } finally {
      setLoadingTie(false);
    }
  };

  return (
    <div className="space-y-4">
      {competences.length === 0 ? (
        <p className="text-gray-500">Aucune compétence enregistrée.</p>
      ) : (
        competences.map((competence) => (
          <div key={competence._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {competence.code} - {competence.nom}
                </h3>
                <p className={`text-sm ${
                  competence.statutGlobal === 'Validée' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Statut: {competence.statutGlobal}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(competence)}
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(competence._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>

            {editMode && editingId === competence._id && (
              <CompetenceForm
                onSubmit={handleSubmitEdit}
                onCancel={handleCancelEdit}
                initialData={editData}
              />
            )}

            <div className="mt-2">
              <h4 className="font-medium">Sous-compétences:</h4>
              <ul className="list-disc pl-5">
                {competence.sousCompetences.map((sc, index) => (
                  <li key={index} className={sc.validee ? 'text-green-600' : 'text-red-600'}>
                    {sc.nom} - {sc.validee ? 'Validée' : 'Non validée'}
                    {(() => {
                      const validated = competence.sousCompetences.filter(s => s.validee).length;
                      const notValidated = competence.sousCompetences.filter(s => !s.validee).length;
                      if (validated === notValidated) {
                        return (
                          <button
                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-700"
                            disabled={loadingTie}
                            onClick={() => handleResolveTie(competence._id, sc._id)}
                          >
                            Choisir comme la plus importante
                          </button>
                        );
                      }
                      return null;
                    })()}
                  </li>
                ))}
              </ul>
              {errorTie && <div className="text-red-500 text-sm mt-2">{errorTie}</div>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CompetenceList;