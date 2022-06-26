package handler

import (
	"finalproject/auth"
	"finalproject/helper"
	usercamp "finalproject/module/user"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userService usercamp.Service
	authService auth.Service
}

func NewUserHandler(userService usercamp.Service, authService auth.Service) *UserHandler {
	return &UserHandler{userService, authService}
}

func (h *UserHandler) RegisterUser(c *gin.Context) {
	var input usercamp.RegisterUserInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Akun gagal didaftarkan", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}
	_, err = h.userService.IsEmailAvailable(input)
	if err != nil {
		errorMessage := gin.H{"errors": "email is available, please use another email"}
		response := helper.APIResponse("Email checking failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newUser, err := h.userService.RegisterUser(input)

	if err != nil {
		response := helper.APIResponse("Akun gagal didaftarkan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	token, err := h.authService.GenerateToken(int(newUser.ID))
	if err != nil {
		response := helper.APIResponse("Akun gagal didaftarkan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := usercamp.FormatUser(newUser, token)

	response := helper.APIResponse("Akun berhasil didaftarkan", http.StatusOK, "success", formatter)

	c.JSON(http.StatusOK, response)

}
func (h *UserHandler) Login(c *gin.Context) {

	var input usercamp.LoginInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Gagal login, validasi gagal dilewati", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	loggedinUser, err := h.userService.Login(input)

	if err != nil {
		errorMessage := gin.H{"errors": err.Error()}

		response := helper.APIResponse("Gagal login", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	token, err := h.authService.GenerateToken(int(loggedinUser.ID))
	if err != nil {
		response := helper.APIResponse("Gagal login, generate token gagal", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := usercamp.FormatUser(loggedinUser, token)

	response := helper.APIResponse("Berhasil login", http.StatusOK, "success", formatter)

	c.JSON(http.StatusOK, response)

}

func (h *UserHandler) FetchUserById(c *gin.Context) {

	userID := c.MustGet("currentUser").(usercamp.User)
	users, err := h.userService.GetUserByID(int(userID.ID))
	if err != nil {
		response := helper.APIResponse("Data user gagal ditampilkan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	formatter := usercamp.FormatUserbyid(users)
	response := helper.APIResponse("Data user berhasil ditampilkan", http.StatusOK, "success", formatter)

	c.JSON(http.StatusOK, response)
}

func (h *UserHandler) UpdateUser(c *gin.Context) {
	var input usercamp.UpdateUserInput
	userID := c.MustGet("currentUser").(usercamp.User)
	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Akun gagal diupdate", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newUser, err := h.userService.UpdateUser(input, int(userID.ID))

	if err != nil {
		response := helper.APIResponse("Akun gagal diupdate", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := usercamp.FormatUserbyid(newUser)

	response := helper.APIResponse("Akun berhasil diupdate", http.StatusOK, "success", formatter)

	c.JSON(http.StatusOK, response)

}
