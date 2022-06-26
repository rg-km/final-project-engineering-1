package handler

import (
	usercamp "finalproject/module/user"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type userHandler struct {
	userService usercamp.Service
}

func NewUserHandler(userService usercamp.Service) *userHandler {
	return &userHandler{userService}
}

func (h *userHandler) Index(c *gin.Context) {
	users, err := h.userService.GetUser()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}
	c.HTML(http.StatusOK, "users.html", gin.H{"users": users})
}

func (h *userHandler) NewUser(c *gin.Context) {
	c.HTML(http.StatusOK, "users_new.html", nil)
}

func (h *userHandler) CreateUser(c *gin.Context) {
	var input usercamp.FormUserInput

	err := c.ShouldBind(&input)
	if err != nil {
		input.Error = err
		c.HTML(http.StatusOK, "users_new.html", input)
		return
	}

	userInput := usercamp.RegisterUserInput{}
	userInput.Username = input.Username
	userInput.Email = input.Email
	userInput.Password = input.Password
	userInput.Role = input.Role

	_, _ = h.userService.CreateUserAdmin(userInput)
	c.Redirect(http.StatusFound, "/users")
}

func (h *userHandler) EditUser(c *gin.Context) {
	userId := c.Param("id")
	id, _ := strconv.Atoi(userId)

	oldUser, err := h.userService.GetUserByID(id)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	c.HTML(http.StatusOK, "users_edit.html", oldUser)
}

func (h *userHandler) UpdateUser(c *gin.Context) {
	userId := c.Param("id")
	id, _ := strconv.Atoi(userId)

	var input usercamp.FormUserInput
	err := c.ShouldBind(&input)
	if err != nil {
		fmt.Print(err)
	}

	userInput := usercamp.UpdateUserInput{}
	userInput.Username = input.Username
	userInput.Email = input.Email

	if input.Password != "" {
		userInput.Password = input.Password
	}
	userInput.Role = input.Role

	_, err = h.userService.UpdateUserAdmin(userInput, id)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}
	c.Redirect(http.StatusFound, "/users")
}

func (h *userHandler) DeleteUser(c *gin.Context) {
	userId := c.Param("id")
	id, _ := strconv.Atoi(userId)

	_, err := h.userService.DeleteUser(id)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	c.Redirect(http.StatusFound, "/users")
}
