package usercamp

type UserFormatter struct {
	ID       int64  `json:"id" sql:"unique"`
	Username string `json:"username"`
	Email    string `json:"email" sql:"unique"`
	Token    string `json:"token"`
}

func FormatUser(user User, token string) UserFormatter {
	formatter := UserFormatter{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Token:    token,
	}

	return formatter
}
