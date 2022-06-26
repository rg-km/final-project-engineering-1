package usercamp

type UserFormatter struct {
	ID       int64  `json:"id" sql:"unique"`
	Username string `json:"username"`
	Email    string `json:"email" sql:"unique"`
	Role     string `json:"role"`
	Token    string `json:"token"`
}
type UserFormatterById struct {
	ID       int64  `json:"id" sql:"unique"`
	Username string `json:"username"`
	Email    string `json:"email" sql:"unique"`
	Role    string `json:"role"`
}

func FormatUser(user User, token string) UserFormatter {
	formatter := UserFormatter{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
		Token:    token,
	}

	return formatter
}

func FormatUserbyid(user User) UserFormatterById {
	formatter := UserFormatterById{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	}

	return formatter
}
