package usercamp

type RegisterUserInput struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type UpdateUserInput struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email" binding:"email"`
	Password string `json:"password"`
}

type LoginInput struct {
	Email    string `json:"email" form:"email" binding:"required,email"`
	Password string `json:"password" form:"password" binding:"required"`
}

type FormCreateUserInput struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type FormUserInput struct {
	Username string `form:"username" binding:"required"`
	Email    string `form:"email" binding:"required,email"`
	Password string `form:"password" binding:"required"`
	Error    error
}
