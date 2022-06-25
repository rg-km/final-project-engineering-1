package dashboard

import (
	"database/sql"
)

type DashboardRepository interface {
	CountUser() (int, error)
	CountContent() (int, error)
	CountCategory() (int, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

func (r *repository) CountUser() (int, error) {
	var count int
	var sqlStmt string = "SELECT COUNT(*) FROM users"

	rows, err := r.db.Query(sqlStmt)

	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			return count, err
		}
	}

	if err != nil {
		return count, err
	}

	return count, nil
}

func (r *repository) CountContent() (int, error) {
	var count int
	var sqlStmt string = "SELECT COUNT(*) FROM contents"

	rows, err := r.db.Query(sqlStmt)

	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			return count, err
		}
	}

	if err != nil {
		return count, err
	}

	return count, nil
}

func (r *repository) CountCategory() (int, error) {
	var count int
	var sqlStmt string = "SELECT COUNT(*) FROM category"

	rows, err := r.db.Query(sqlStmt)

	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			return count, err
		}
	}

	if err != nil {
		return count, err
	}

	return count, nil
}
