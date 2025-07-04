import { useState } from 'react';
import * as yup from 'yup';

const schema = yup.array().of(
  yup.object().shape({
    nom: yup.string().required('Le nom de la sous-compétence est requis'),
    validee: yup.boolean()
  })
).min(1, 'Au moins une sous-compétence est requise');

const EvaluationForm = ({ sousCompetences, onSubmit }) => {
  const [evaluations, setEvaluations] = useState([...sousCompetences]);
  const [errors, setErrors] = useState('');

  const handleChange = (index, e) => {
    const newEvaluations = [...evaluations];
    newEvaluations[index].validee = e.target.checked;
    setEvaluations(newEvaluations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(evaluations, { abortEarly: false });
      setErrors('');
      onSubmit(evaluations);
    } catch (validationError) {
      setErrors(validationError.errors.join(' '));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-100">
        <h4 className="text-2xl font-bold text-blue-700 mb-6 text-center">Modifier les évaluations</h4>
        <div className="space-y-4">
          {evaluations.map((sc, index) => (
            <div key={index} className="flex items-center justify-between bg-blue-50/60 p-3 rounded-lg border border-blue-100">
              <span className="text-gray-700 font-medium">{sc.nom}</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sc.validee}
                  onChange={(e) => handleChange(index, e)}
                  className="accent-blue-500 w-5 h-5"
                />
                <span className="text-sm">Validée</span>
              </label>
            </div>
          ))}
        </div>
        {errors && <p className="text-red-500 text-sm mt-4 text-center">{errors}</p>}
        <div className="flex justify-end mt-8">
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

export default EvaluationForm;