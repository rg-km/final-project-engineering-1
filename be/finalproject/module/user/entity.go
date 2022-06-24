package usercamp

type User struct {
	ID       int64 `url:"id" json:"id"`
	Username string
	Password string
	Email    string
	Token    string
}
