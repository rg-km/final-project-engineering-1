package usercamp

import "database/sql"

type Repository interface {
	Save(user User) (User, error)
	FindByEmail(email string) (User, error)
	FindByID(ID int) (User, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(user User) (User, error) {
	var sqlStmt string = "INSERT INTO users (username, password, email) VALUES (?, ?, ?);"

	_, err := r.db.Exec(sqlStmt, user.Username, user.Password, user.Email)

	if err != nil {
		return user, err
	}
	sqlStmt = "SELECT * FROM users ORDER BY id DESC LIMIT 1"

	row := r.db.QueryRow(sqlStmt)
	err = row.Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.Token,
	)
	if err != nil {
		return user, err
	}

	return user, nil
}
func (r *repository) FindByEmail(email string) (User, error) {
	var user User
	var sqlStmt string = "SELECT * FROM users WHERE email= ?"

	row := r.db.QueryRow(sqlStmt, email)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.Token,
	)

	if err != nil {
		return user, err
	}

	return user, nil
}
func (r *repository) FindByID(ID int) (User, error) {
	var user User

	var sqlStmt string = "SELECT * FROM users WHERE id= ?"

	row := r.db.QueryRow(sqlStmt, ID)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
		&user.Token,
	)
	if err != nil {
		return user, err
	}

	return user, nil
}
