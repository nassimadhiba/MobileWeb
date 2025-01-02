const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 8084;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: '127.0.0.1', // Utilisez 127.0.0.1 pour éviter les problèmes d'IPv6
  user: 'root',      // Remplacez par votre nom d'utilisateur MySQL
  password: '',      // Remplacez par votre mot de passe MySQL si nécessaire
  database: 'react', // Remplacez par le nom de votre base de données
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Route d'authentification (connexion)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' });
  }

  // Vérifier si l'utilisateur existe dans la base de données
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erreur de base de données :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe invalide.' });
    }
    //add circuit 
    app.post('/gestioncircuit/addC', (req, res) => {
      const { NameC, Description, Time, Distance } = req.body;
    
      if (!NameC || !Description || !Time || !Distance) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
      }
    
      const newCircuit = {
        id: circuits.length + 1,
        NameC,
        Description,
        Time,
        Distance,
      };
      circuits.push(newCircuit);
  res.status(201).json({ message: 'Circuit ajouté avec succès!', circuit: newCircuit });
});

// Endpoint pour récupérer tous les circuits
app.post('/gestioncircuit/addC', (req, res)  => {
  res.status(200).json(circuits);
});

    // Vérification du mot de passe
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la vérification du mot de passe :', err);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe invalide.' });
      }

      // Authentification réussie
      res.json({ success: true, id: user.id, username: user.username });
    });
  });
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d’exécution sur le port ${PORT}`);
});
