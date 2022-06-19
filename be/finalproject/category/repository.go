package category

import "database/sql"

type CategoryRepository interface {
	Save(category Category) (Category, error)
	FetchAllCategories() ([]Category, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(category Category) (Category, error) {
	var sqlStmt string = "INSERT INTO category (name, status) VALUES(?, ?);"

	_, err := r.db.Exec(sqlStmt, category.Name, category.Status)
	if err != nil {
		return category, err
	}

	sqlStmt = "SELECT * FROM category"

	row := r.db.QueryRow(sqlStmt, category)
	err = row.Scan(
		&category.ID,
		&category.Name,
		&category.Status,
	)
	if err != nil {
		return category, err
	}

	return category, nil
}

func (r *repository) FetchAllCategories() ([]Category, error) {
	var sqlStmt string = "SELECT * FROM category"

	rows, err := r.db.Query(sqlStmt)
	if err != nil {
		return nil, err
	}

	var categories []Category
	for rows.Next() {
		var category Category
		err = rows.Scan(&category.ID, &category.Name, &category.Status)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}

	return categories, nil
}
