const competenceService = require("../services/competenceService");

const getAll = async (req, res) => {
  try {
    const result = await competenceService.getAllCompetences();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await competenceService.createCompetence(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEval = async (req, res) => {
  try {
    console.log("ID reçu:", req.params.id);
    console.log("Sous-compétences:", req.body.sousCompetences);

    const result = await competenceService.updateEvaluation(
      req.params.id,
      req.body.sousCompetences
    );

    res.json(result);
  } catch (err) {
    console.error("Erreur PUT:", err.message);
    res.status(404).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await competenceService.deleteCompetence(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await competenceService.updateCompetence(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, create, updateEval, remove, update };
