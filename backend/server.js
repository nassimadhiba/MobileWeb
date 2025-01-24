const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
 

const app = express();
const PORT = 8084;

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

// Route d'authentification
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' });
  }

  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erreur de base de données :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe invalide.' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la vérification du mot de passe :', err);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe invalide.' });
      }

      res.json({ success: true, id: user.id, username: user.username });
    });
  });
});

// Route pour ajouter un circuit
app.post('/gestioncircuit/addC', (req, res) => {
  const { IDC, Name, Description, Distance, Duration, ImgUrl, Color } = req.body;

  const sql = 'INSERT INTO circuit (IDC, Name, Descreption, Distance, Duration, ImgUrl, Color) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [IDC, Name, Description, Distance, Duration, ImgUrl, Color], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’insertion:', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(200).send('Circuit ajouté avec succès');
  });
});

 
// Update circuit
app.put('/editC/:id', (req, res) => {
  const { Name, Description, Distance, Duration, ImgUrl, Color } = req.body;
  const query = 'UPDATE circuits SET Name = ?, Description = ?, Distance = ?, Duration = ?, ImgUrl = ?, Color = ? WHERE IDC = ?';
  
  db.query(query, [Name, Description, Distance, Duration, ImgUrl, Color, req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating circuit:', err);
      return res.status(500).json({ error: 'Error updating circuit' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Circuit not found' });
    }
    res.json({ message: 'Circuit updated successfully' });
  });
});


// Route pour récupérer tous les circuits
app.get('/gestioncircuit/showAll', (req, res) => {
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

// Route pour récupérer un circuit par ID
// Route pour récupérer les détails d'un circuit par son ID
app.get('/gestioncircuit/showC/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM circuits WHERE IDC = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des détails' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Circuit non trouvé' });
    } else {
      res.json({ success: true, data: results[0] });
    }
  });
});

app.post('/gestionmonument/add', (req, res) => {
  const { IDC, IDM, Name, Descreption, ImgUrl } = req.body;

  console.log('Données reçues pour insertion:', req.body); // Log les données reçues

  const sql = 'INSERT INTO monument (IDC, IDM, Name, Descreption, ImgUrl) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [IDC, IDM, Name, Descreption, ImgUrl], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’insertion:', err); // Log l'erreur complète
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(200).send('Monument ajouté avec succès' );
  });
}); 

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


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});