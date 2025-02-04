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

 
// Route pour modifier un circuit par ID
app.put('/gestioncircuit/editC/:IDC', (req, res) => {
  const { IDC } = req.params;
  const { Name, Descreption, Distance, Duration, ImgUrl, Color } = req.body;

  console.log('Route PUT /gestioncircuit/editC appelée pour ID:', IDC);

  const query = `
    UPDATE circuit
    SET Name = ?, Descreption = ?, Distance = ?, Duration = ?, ImgUrl = ?, Color = ?
    WHERE IDC = ?
  `;

  db.query(query, [Name, Descreption, Distance, Duration, ImgUrl, Color, IDC], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification du circuit:', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (result.affectedRows === 0) {
      console.log('❌ Aucun circuit trouvé avec IDC:', IDC);
      return res.status(404).json({ error: 'Circuit non trouvé.' });
    }

    console.log('✅ Circuit modifié avec succès:', result);
    res.json({ message: 'Circuit modifié avec succès.' });
  });
});


app.delete('/gestioncircuit/deleteC/:IDC', (req, res) => {
  const circuitId = req.params.IDC;
  console.log(`Tentative de suppression du circuit avec IDC: ${circuitId}`);  // Log pour déboguer
  
  

  // Suppression du circuit
//  circuits = circuits.filter((c) => c.IDC !== parseInt(circuitId));
const query = 'DELETE FROM circuit WHERE IDC = ?';

db.query(query, [circuitId], (err, results) => {
  if (err) {
    console.error('Erreur lors de la Suppression du circuit:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
} )

  console.log(`Circuit supprimé avec IDC: ${circuitId}`);  // Log pour confirmer suppression

  return res.send('Circuit supprimé avec succès');
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

app.get('/gestionmonument/show/:IDM', (req, res) => {
  const { IDM } = req.params; 
  console.log('Route GET /gestionmonumnent/:IDM appelée avec IDM:', IDM);

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

app.put('/gestionmonument/edit/:IDM', (req, res) => {
  const { IDM } = req.params; // Récupérer l'IDM du paramètre de l'URL
  const { IDC, Name, Descreption, ImgUrl } = req.body; // Récupérer les données du body de la requête

  console.log('Route PUT /gestionmonument/edit appelée pour IDM:', IDM);

  // Validation de l'IDM
  if (!IDM) {
    return res.status(400).json({ error: 'IDM manquant ou invalide' });
  }

  // La requête SQL pour mettre à jour un monument, en utilisant l'IDM pour l'identification
  const query = `
    UPDATE monument
    SET IDC = ?, Name = ?, Descreption = ?, ImgUrl = ?
    WHERE IDM = ?
  `;
  console.log(`Executing query: ${query}`);
  db.query(query, [IDC, Name, Descreption, ImgUrl, IDM], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification du monument:', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (result.affectedRows === 0) {
      console.log('❌ Aucun monument trouvé avec IDM:', IDM);
      return res.status(404).json({ error: 'Monument non trouvé.' });
    }

    console.log('✅ Monument modifié avec succès:', result);
    res.json({ message: 'Monument modifié avec succès.' });
  });
});


app.delete('/gestionmonument/deleteM/:IDM', (req, res) => {
  const monumentId = req.params.IDM;
  console.log(`Tentative de suppression du Monument avec IDM: ${monumentId}`);  // Log pour déboguer
  
  

  // Suppression du circuit
//  circuits = circuits.filter((c) => c.IDC !== parseInt(circuitId));
const query = 'DELETE FROM monument WHERE IDM = ?';

db.query(query, [monumentId], (err, results) => {
  if (err) {
    console.error('Erreur lors de la Suppression du Monument:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
} )

  console.log(`Monument supprimé avec IDC: ${monumentId}`);  // Log pour confirmer suppression

  return res.send('Monument supprimé avec succès');
});
 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});