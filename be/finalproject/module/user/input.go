package usercamp

type RegisterUserInput struct {
	Username string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Email    string `json:"email" form:"email" binding:"required,email"`
	Password string `json:"password" form:"password" binding:"required"`
}

type FormCreateUserInput struct {
	Username string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}
