package main

import (
	"database/sql"

	"finalproject/module/category"
	"finalproject/module/content"
	"finalproject/module/respon"
	"finalproject/module/user"

	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func Migrate() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "../forum-camp.db")
	if err != nil {
		panic(err)
	}

	// TABLE : users
	sqlStmt := `
	CREATE TABLE IF NOT EXISTS users (
		id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
		username varchar(50) not null,
		password varchar(255) not null,
		email varchar(50) not null,
		token varchar(255) not null
	);`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`
	INSERT INTO users(username, password, email, token) VALUES
		('doni', '1234', 'doni@gmail.com', "12345"),
		('dina', '4321', 'dina@gmail.com', "12345"),
		('dito', '2552', 'dito@gmail.com', "12345")`)
	if err != nil {
		panic(err)
	}

	// TABLE : content
	sqlStmt = `
	CREATE TABLE IF NOT EXISTS content (
		id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
		id_user integer not null,
		id_category integer not null,
		title varchar(255) not null,
		dekripsi text not null,
		path_image varchar(255) not null,
		last_modified datetime not null
	);`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`
	INSERT INTO content(id_user, id_category, title, dekripsi, path_image, last_modified) VALUES
		(12, "1", "Backend", "Backend blablabla", "public/images/backend.jpg", "2020-01-01 00:00:00"),
		(14, "1", "Frontend", "Frontend blablabla", "public/images/frontend.jpg", "2020-01-01 00:00:00")`)
	if err != nil {
		panic(err)
	}

	// TABLE : category
	sqlStmt = `
	CREATE TABLE IF NOT EXISTS category (
		id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
		name varchar(255) not null,
		status bool not null,
		created_at datetime not null,
		updated_at datetime not null
	);`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`
	INSERT INTO category(name, status, created_at, updated_at) VALUES
		("Backend", true, "2020-01-01 00:00:00", "2020-01-01 00:00:00")
	`)
	if err != nil {
		panic(err)
	}

	// TABLE respon
	sqlStmt = `
	CREATE TABLE IF NOT EXISTS respon (
		id integer  PRIMARY KEY AUTOINCREMENT NOT NULL,
		id_content integer not null,
		id_user integer not null,
		answer text not null,
		status bool not null,
		created_at datetime not null
	)`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`
	INSERT INTO respon(id_content, id_user, answer, status, created_at) VALUES
		(1, 12, "Backend blablabla", true, "2020-01-01 00:00:00")
	`)
	if err != nil {
		panic(err)
	}

	return db, nil
}

// Run This Script for migration db
func main() {
	db, err := Migrate()
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var user usercamp.User
		err = rows.Scan(&user.ID, &user.Username, &user.Password, &user.Email, &user.Token)
		if err != nil {
			panic(err)
		}
		fmt.Println(user)
	}

	rows, err = db.Query("SELECT * FROM content")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var contentItem content.Content
		err = rows.Scan(&contentItem.ID, &contentItem.IDUser, &contentItem.IDCategory, &contentItem.Title, &contentItem.Dekripsi, &contentItem.PathImage, &contentItem.LastModified)
		if err != nil {
			panic(err)
		}
		fmt.Println(contentItem)
	}

	rows, err = db.Query("SELECT * FROM category")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var categoryItem category.Category
		err = rows.Scan(&categoryItem.ID, &categoryItem.Name, &categoryItem.Status, &categoryItem.CreatedAt, &categoryItem.UpdatedAt)
		if err != nil {
			panic(err)
		}
		fmt.Println(categoryItem)
	}

	rows, err = db.Query("SELECT * FROM respon")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var responItem respon.Respon
		err = rows.Scan(&responItem.ID, &responItem.IDContent, &responItem.IDUser, &responItem.Answer, &responItem.Status, &responItem.CreatedAt)
		if err != nil {
			panic(err)
		}
		fmt.Println(responItem)
	}
}
