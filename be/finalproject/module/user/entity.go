package usercamp

type User struct {
	ID       int64 `sql:"not null" `
	Username string
	Password string
	Email    string
	Token    string
}
