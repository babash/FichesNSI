-- Base d'exemple de la fiche SQL (données fictives).
PRAGMA foreign_keys = ON;
CREATE TABLE classe (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  salle TEXT
);
CREATE TABLE eleve (
  id INTEGER PRIMARY KEY,
  prenom TEXT NOT NULL,
  age INTEGER,
  id_classe INTEGER REFERENCES classe(id)
);
INSERT INTO classe VALUES (1, '1G1', 'B12'), (2, 'TG2', 'C04');
INSERT INTO eleve VALUES
  (1, 'Anli', 16, 1),
  (2, 'Faïza', 17, 1),
  (3, 'Zaïna', 18, 2),
  (4, 'Nassim', 17, 2),
  (5, 'Moinécha', 16, 1);
