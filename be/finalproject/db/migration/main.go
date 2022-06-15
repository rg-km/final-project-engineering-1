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
	CREATE TABLE users (
    id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
    username varchar(50) not null,
    password varchar(255) not null,
    email varchar(50) not null
	token varchar(255) not null
);

INSERT INTO users(username, password, email) VALUES
    ('doni', '1234', 'doni@gmail.com'),
    ('dina', '4321', 'dina@gmail.com'),
    ('dito', '2552', 'dito@gmail.com');`)

	if err != nil {
		panic(err)
	}

}
