import { useState, useEffect } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  code: yup.string().required('Le code est requis'),
  nom: yup.string().required('Le nom est requis'),
  sousCompetences: yup.array().of(
    yup.object().shape({
      nom: yup.string().required('Le nom de la sous-compétence est requis'),
      validee: yup.boolean()
    })
  ).min(1, 'Au moins une sous-compétence est requise')
});

const CompetenceForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    sousCompetences: [{ nom: '', validee: false }]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        nom: initialData.nom || '',
        sousCompetences: initialData.sousCompetences || [{ nom: '', validee: false }]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubCompChange = (index, e) => {
    const newSubComps = [...formData.sousCompetences];
    newSubComps[index][e.target.name] = e.target.name === 'validee' 
      ? e.target.checked 
      : e.target.value;
    setFormData({
      ...formData,
      sousCompetences: newSubComps
    });
  };

  const addSubCompetence = () => {
    setFormData({
      ...formData,
      sousCompetences: [...formData.sousCompetences, { nom: '', validee: false }]
    });
  };

  const removeSubCompetence = (index) => {
    const newSubComps = formData.sousCompetences.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sousCompetences: newSubComps
    });
  };

  const validatedCount = formData.sousCompetences.filter(sc => sc.validee).length;
  const notValidatedCount = formData.sousCompetences.filter(sc => !sc.validee).length;

  const handleResolveTieLocal = (index) => {
    const chosen = formData.sousCompetences[index];
    const newSubComps = [...formData.sousCompetences];
    if (chosen.validee) {
      const toValidateIdx = newSubComps.findIndex((sc, i) => !sc.validee && i !== index);
      if (toValidateIdx !== -1) newSubComps[toValidateIdx].validee = true;
    } else {
      const toInvalidateIdx = newSubComps.findIndex((sc, i) => sc.validee && i !== index);
      if (toInvalidateIdx !== -1) newSubComps[toInvalidateIdx].validee = false;
    }
    setFormData({ ...formData, sousCompetences: newSubComps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData);
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach(err => {
        if (err.path.startsWith('sousCompetences')) {
          const match = err.path.match(/sousCompetences\[(\d+)\]\.nom/);
          if (match) {
            const idx = match[1];
            if (!newErrors.sousCompetences) newErrors.sousCompetences = {};
            newErrors.sousCompetences[idx] = err.message;
          }
        } else {
          newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">{initialData ? 'Modifier la compétence' : 'Ajouter une compétence'}</h2>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Code :</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.code ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Code de la compétence"
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.nom ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Nom de la compétence"
          />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Sous-compétences :</label>
          <div className="space-y-3">
            {formData.sousCompetences.map((sc, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center gap-2 bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                <input
                  type="text"
                  name="nom"
                  value={sc.nom}
                  onChange={(e) => handleSubCompChange(index, e)}
                  className={`flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.sousCompetences && errors.sousCompetences[index] ? 'border-red-400' : 'border-gray-300'}`}
                  placeholder="Nom de la sous-compétence"
                />
                {errors.sousCompetences && errors.sousCompetences[index] && (
                  <p className="text-red-500 text-xs ml-2">{errors.sousCompetences[index]}</p>
                )}
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    name="validee"
                    checked={sc.validee}
                    onChange={(e) => handleSubCompChange(index, e)}
                    className="accent-blue-500"
                  />
                  Validée
                </label>
                {validatedCount === notValidatedCount && formData.sousCompetences.length > 1 && (
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-700"
                    onClick={() => handleResolveTieLocal(index)}
                  >
                    Choisir comme la plus importante
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeSubCompetence(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded transition border border-transparent hover:border-red-300"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubCompetence}
            className="mt-3 text-blue-600 hover:text-white hover:bg-blue-500 border border-blue-300 px-4 py-2 rounded-lg font-semibold transition"
          >
            + Ajouter une sous-compétence
          </button>
          {errors.sousCompetences && typeof errors.sousCompetences === 'string' && (
            <p className="text-red-500 text-xs mt-1">{errors.sousCompetences}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 font-semibold transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-bold shadow hover:from-blue-600 hover:to-blue-800 transition"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompetenceForm;