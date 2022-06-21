package content

import (
	"database/sql"
	"time"
)

type Repository interface {
	Save(content Content) (Content, error)
	SaveUpdate(content Content) (Content, error)

	FetchAllContent() ([]Content, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(content Content) (Content, error) {
	var sqlStmt string = "INSERT INTO contents (iduser, idkategori, title, deskripsi, path, last_modified) VALUES (?, ?, ?, ?, ?,?);"

	_, err := r.db.Exec(sqlStmt, content.IDUser, content.IDCategory, content.Title, content.Deksripsi, content.Path, time.Now())

	if err != nil {
		return content, err
	}
	sqlStmt = "SELECT * FROM contents ORDER BY id DESC LIMIT 1"

	row := r.db.QueryRow(sqlStmt)
	err = row.Scan(
		&content.ID,
		&content.Title,
		&content.Deksripsi,
		&content.Path,
		&content.LastModified,
		&content.IDUser,
		&content.IDCategory,
	)
	if err != nil {
		return content, err
	}
	return content, nil
}

func (r *repository) SaveUpdate(content Content) (Content, error) {
	var sqlStmt string = "UPDATE contents SET idkategori=?, title=?, deskripsi=?, last_modified=? WHERE iduser=? and id=?"

	_, err := r.db.Exec(sqlStmt, content.IDCategory, content.Title, content.Deksripsi, time.Now(), content.IDUser, content.ID)

	if err != nil {
		return content, err
	}
	sqlStmt = "SELECT * FROM contents WHERE iduser=? and id=?"

	row := r.db.QueryRow(sqlStmt, content.IDUser, content.ID)
	err = row.Scan(
		&content.ID,
		&content.Title,
		&content.Deksripsi,
		&content.Path,
		&content.LastModified,
		&content.IDUser,
		&content.IDCategory,
	)
	if err != nil {
		return content, err
	}
	return content, nil
}

func (r *repository) FetchAllContent() ([]Content, error) {
	var sqlStmt string = "SELECT * FROM contents"

	rows, err := r.db.Query(sqlStmt)
	if err != nil {
		return nil, err
	}

	var contents []Content
	for rows.Next() {
		var content Content
		err = rows.Scan(
			&content.ID,
			&content.Title,
			&content.Deksripsi,
			&content.Path,
			&content.LastModified,
			&content.IDUser,
			&content.IDCategory)
		if err != nil {
			return nil, err
		}
		contents = append(contents, content)
	}

	return contents, nil
}
