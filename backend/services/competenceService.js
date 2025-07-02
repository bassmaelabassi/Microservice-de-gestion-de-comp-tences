const Competence = require("../models/competenceModel");
const { calculerStatutGlobal } = require("../utils/statusCalculator");

const getAllCompetences = async () => {
  const competences = await Competence.find();
  return competences.map(c => ({
    ...c.toObject(),
    statutGlobal: calculerStatutGlobal(c.sousCompetences),
  }));
};

const createCompetence = async (data) => {
  const competence = new Competence(data);
  return await competence.save();
};

const updateEvaluation = async (id, sousCompetences) => {
  const competence = await Competence.findById(id);
  if (!competence) throw new Error("Compétence non trouvée");

  competence.sousCompetences = sousCompetences;
  return await competence.save();
};

const deleteCompetence = async (id) => {
  return await Competence.findByIdAndDelete(id);
};

const updateCompetence = async (id, data) => {
  return await Competence.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getAllCompetences,
  createCompetence,
  updateEvaluation,
  deleteCompetence,
  updateCompetence,
};
