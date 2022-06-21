package respon

import (
	"database/sql"

	"time"
)

type Repository interface {
	Save(respon Respon) (Respon, error)

	FetchAllResponByContentId(idContent int64) ([]Respon, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(respon Respon) (Respon, error) {
	sqlStmt := `
		INSERT INTO 
			respons (id_content, id_user, answer, status, created_at)
		VALUES 
			(?, ?, ?, ?, ?)
		`

	_, err := r.db.Exec(sqlStmt, respon.IDContent, respon.IDUser, respon.Answer, respon.Status, time.Now())

	if err != nil {
		return respon, err
	}
	sqlStmt = `
		SELECT *
		FROM respons
		ORDER BY id DESC
		LIMIT 1
	`

	row := r.db.QueryRow(sqlStmt)
	err = row.Scan(
		&respon.ID,
		&respon.IDContent,
		&respon.IDUser,
		&respon.Answer,
		&respon.Status,
		&respon.CreatedAt,
	)

	if err != nil {
		return respon, err
	}
	return respon, nil
}

func (r *repository) FetchAllResponByContentId(idContent int64) ([]Respon, error) {
	sqlStmt := `
		SELECT *
		FROM respons
		WHERE id_content = ?
	`

	rows, err := r.db.Query(sqlStmt, idContent)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var respons []Respon
	for rows.Next() {
		var respon Respon
		err = rows.Scan(
			&respon.ID,
			&respon.IDContent,
			&respon.IDUser,
			&respon.Answer,
			&respon.Status,
			&respon.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		respons = append(respons, respon)
	}
	return respons, nil
}
