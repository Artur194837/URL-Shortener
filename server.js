import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./data/database.db'); //Lokale Datenbankdatei

const app = express();
app.use(express.json()); // Für das Parsen von JSON-Daten im Request-Body
// Statische Dateien aus dem public-Ordner bereitstellen
app.use(express.static("public"));


// Bei GET auf / main.html zurückgeben
app.get("/", (req, res) => {
  res.sendFile("main.html", { root: "public" });
});

// Bei POST auf / die Ursprungs- und gekürzte URL in die Datenbank einfügen
app.post("/", (req, res) => {
  const { ursprung, kuerzung } = req.body;
  db.run('INSERT INTO UrsprungsURLZuGekuerzteURL (ursprung, kuerzung) VALUES (?, ?)', [ursprung, kuerzung], function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("Kürzung erfolgreich angelegt");
  });
});

// Bei GET auf /:kuerzung die Ursprungs-URL aus der Datenbank holen und weiterleiten
app.get("/:kuerzung", (req, res) => {
  const kuerzung = req.params.kuerzung;

  db.get('SELECT ursprung FROM UrsprungsURLZuGekuerzteURL WHERE kuerzung = ?', [kuerzung], (err, row) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (row) {
      res.redirect("http://" + row.ursprung);
    } else {
      res.status(404).send("Kürzung nicht gefunden");
    }
  });
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Listening on Port http://localhost:${port}`);
});

