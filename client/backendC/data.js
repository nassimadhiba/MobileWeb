const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'react',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

//client

// Route pour récupérer tous les circuits
app.get('/gestionmonument/showAl', (req, res) => {
  const query = 'SELECT * FROM monument';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des monuments:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

//showmonument

app.get('/gestionmonument/show/:IDM', (req, res) => {
  const { IDM } = req.params; 
  console.log('Route GET /client/:IDM appelée avec IDM:', IDM);

  if (!IDM) {
    return res.status(400).json({ error: 'IDM valide est requis.' });
  }

  const query = 'SELECT * FROM monument WHERE IDM = ?';

  db.query(query, [IDM], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du monument:', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      console.log('❌ Aucun monument trouvé avec IDM:', IDM);
      return res.status(404).json({ error: 'Monument non trouvé.' });
    }

    console.log('✅ Monument trouvé:', results[0]);
    res.json(results[0]);
  });
});


// Route pour récupérer un circuit par ID
// Route pour récupérer les détails d'un circuit par son ID
app.get('/gestioncircuit/showC/:IDC', (req, res) => {
  const { IDC } = req.params;
  console.log('Route GET /gestioncircuit/:IDC appelée avec IDC:', IDC);

  if (!IDC) {
    return res.status(400).json({ error: 'IDC valide est requis.' });
  }

  const query = 'SELECT * FROM circuit WHERE IDC = ?';

  db.query(query, [IDC], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du circuit:', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      console.log('❌ Aucun circuit trouvé avec IDC:', IDC);
      return res.status(404).json({ error: 'Circuit non trouvé.' });
    }

    console.log('✅ Circuit trouvé:', results[0]);
    res.json(results[0]);
  });
});


// Route pour récupérer tous les circuits
app.get('/gestioncircuit/showAll', (req, res) => {
  console.log('/gestioncircuit/showAll');


  const query = 'SELECT * FROM circuit';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des circuits:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});