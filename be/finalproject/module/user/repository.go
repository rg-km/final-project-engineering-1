package usercamp

import "database/sql"

type Repository interface {
	Save(user User) (User, error)
	Updateuserrepo(user User) (User, error)
	FindByEmail(email string) (User, error)
	FindByID(ID int) (User, error)
	FetchAllUser() ([]User, error)
	Delete(ID int) (User, error)
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
	)
	if err != nil {
		return user, err
	}

	return user, nil
}
func (r *repository) Updateuserrepo(user User) (User, error) {
	var sqlStmt string = "UPDATE users SET username=?, password=?, email=? WHERE id=? "

	_, err := r.db.Exec(sqlStmt, user.Username, user.Password, user.Email, user.ID)

	if err != nil {
		return user, err
	}
	sqlStmt = "SELECT * FROM users WHERE id=?"

	row := r.db.QueryRow(sqlStmt, user.ID)
	err = row.Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
	)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (r *repository) FetchAllUser() ([]User, error) {
	var sqlStmt string = "SELECT * FROM users"

	rows, err := r.db.Query(sqlStmt)
	if err != nil {
		return nil, err
	}

	var users []User
	for rows.Next() {
		var user User
		err = rows.Scan(&user.ID, &user.Username, &user.Password, &user.Email)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func (r *repository) Delete(ID int) (User, error) {
	var user User

	var sqlStmt = "SELECT * FROM users WHERE id=?"

	row := r.db.QueryRow(sqlStmt, ID)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Email,
	)

	if err != nil {
		return user, err
	}

	sqlStmt = "DELETE FROM users WHERE id=?"

	_, err = r.db.Exec(sqlStmt, ID)
	if err != nil {
		return user, err
	}

	return user, nil
}
