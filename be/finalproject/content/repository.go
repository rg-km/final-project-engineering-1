package content

import "database/sql"

type Repository interface {
	Save(content Content) (Content, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(content Content) (Content, error) {
	var sqlStmt string = "INSERT INTO content (id_user, id_category, title, deskripsi, path_image) VALUES (?, ?, ?, ?, ?);"

	_, err := r.db.Exec(sqlStmt, content.IDUser, content.IDCategory, content.Title, content.Deskripsi, content.PathImage)

	if err != nil {
		return content, err
	}
	sqlStmt = "SELECT * FROM content WHERE id_user=?"

	row := r.db.QueryRow(sqlStmt, content.IDUser)
	err = row.Scan(
		&content.ID,
		&content.IDUser,
		&content.IDCategory,
		&content.Title,
		&content.Deskripsi,
		&content.PathImage,
		&content.LastModified,
	)
	if err != nil {
		return content, err
	}
	return content, nil
}
