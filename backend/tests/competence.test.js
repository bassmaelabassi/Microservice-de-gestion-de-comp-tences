const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const { calculerStatutGlobal } = require('../utils/statusCalculator');

describe('Calculateur de statut', () => {
    it('devrait retourner "Validée" si les compétences validées sont majoritaires ou égales', () => {
        const sousCompetences1 = [{ validee: true }, { validee: true }, { validee: false }];
        expect(calculerStatutGlobal(sousCompetences1)).toBe('Validée');

        const sousCompetences2 = [{ validee: true }, { validee: false }];
        expect(calculerStatutGlobal(sousCompetences2)).toBe('Validée');
    });

    it('devrait retourner "Non validée" si les compétences non validées sont strictement majoritaires', () => {
        const sousCompetences = [{ validee: true }, { validee: false }, { validee: false }];
        expect(calculerStatutGlobal(sousCompetences)).toBe('Non validée');
    });

    it('devrait gérer un tableau vide et le considérer comme "Non validée"', () => {
        const sousCompetences = [];
        expect(calculerStatutGlobal(sousCompetences)).toBe('Non validée');
    });
});

describe('API des Compétences', () => {

    beforeAll(async () => {
        const mongoUri = 'mongodb://127.0.0.1:27017/competences-test-db';
        await mongoose.connect(mongoUri);
    });

    afterEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /api/competences', () => {
        it('devrait retourner un tableau vide quand la base de données est vide', async () => {
            const res = await request(app).get('/api/competences');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([]);
        });

        it('devrait retourner une liste de compétences avec leur statut calculé', async () => {
            const Competence = mongoose.model('Competence');
            await Competence.create({
                code: 'C1',
                nom: 'Test Compétence',
                sousCompetences: [{ nom: 'SC1', validee: true }, {nom: 'SC2', validee: false}]
            });

            const res = await request(app).get('/api/competences');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].code).toBe('C1');
            expect(res.body[0].statutGlobal).toBe('Validée');
        });
    });
});

const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

describe('API des Compétences', () => {
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/competencesTestDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await mongoose.model('Competence').deleteMany({});
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/competences', () => {
    it('devrait retourner un statut 200 et une liste de compétences', async () => {
      const Competence = mongoose.model('Competence');
      await new Competence({ code: 'T1', nom: 'Test', sousCompetences: [] }).save();
      
      const res = await request(app).get('/api/competences');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].code).toBe('T1');
    });
  });
}); 