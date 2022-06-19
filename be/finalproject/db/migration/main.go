package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

// Run This Script for migration db
func main() {
	db, err := sql.Open("sqlite3", "../forum-camp1.db")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
    id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
    username varchar(50) not null,
    password varchar(255) not null,
    email varchar(50) not null,
	token varchar(255) not null
);

INSERT INTO users(username, password, email) VALUES
    ('doni', '1234', 'doni@gmail.com'),
    ('dina', '4321', 'dina@gmail.com'),
    ('dito', '2552', 'dito@gmail.com');`)

	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS contents (
		id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
		title varchar(255) not null,
		deskripsi varchar(255) not null,
		path_image varchar(255) not null
);

INSERT INTO contents(title, deskripsi, path_image) VALUES
		("Backend", "Backend blablabla", "public/images/backend.jpg");`)

	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS category (
		id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
		name varchar(255) not null,
		status bool not null
);

INSERT INTO category(name, status) VALUES
		("Video", true),
		("Materi", false),
		("Gambar", true);`)

	if err != nil {
		panic(err)
	}

	// sqlStmt := `DROP TABLE contents;`
	// _, err = db.Exec(sqlStmt)
	// if err != nil {
	// 	panic(err)
	// }

}
