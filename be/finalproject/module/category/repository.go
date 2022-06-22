package category

import "database/sql"

type CategoryRepository interface {
	Save(category Category) (Category, error)
	FetchAllCategories() ([]Category, error)
	FindByID(ID int) (Category, error)
	Update(category Category) (Category, error)
	Delete(ID int) (Category, error)
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

func (r *repository) FindByID(ID int) (Category, error) {
	var category Category

	var sqlStmt string = "SELECT * FROM category WHERE id= ?"

	row := r.db.QueryRow(sqlStmt, ID)
	err := row.Scan(
		&category.ID,
		&category.Name,
		&category.Status,
	)
	if err != nil {
		return category, err
	}
	return category, nil
}

func (r *repository) Update(category Category) (Category, error) {
	var sqlStmt string = "UPDATE category SET name=?, status=? WHERE id=?"

	_, err := r.db.Exec(sqlStmt, category.Name, category.Status, category.ID)
	if err != nil {
		return category, err
	}

	sqlStmt = "SELECT * FROM category WHERE id=?"

	row := r.db.QueryRow(sqlStmt, category.ID)
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

func (r *repository) Delete(ID int) (Category, error) {
	var category Category

	var sqlStmt string = "DELETE FROM category WHERE id=?"

	_, err := r.db.Exec(sqlStmt, ID)
	if err != nil {
		return category, err
	}
	return category, nil
}
