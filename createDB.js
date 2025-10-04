import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./data/database.db');

db.serialize(() => {
  db.run('CREATE TABLE UrsprungsURLZuGekuerzteURL (ursprung TEXT, kuerzung TEXT)')
});

db.close();