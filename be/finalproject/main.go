package main

import (
	"database/sql"
	"finalproject/auth"
	"finalproject/handler"
	usercamp "finalproject/user"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {

	db, err := sql.Open("sqlite3", "./db/forum-camp1.db")

	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println("koneksi berhasil")

	userRepository := usercamp.NewRepository(db)
	userService := usercamp.NewService(userRepository)
	userHandler := handler.NewUserHandler(userService, auth.NewService())

	router := gin.Default()
	api := router.Group("api/v1")

	api.POST("/register", userHandler.RegisterUser)
	api.POST("/login", userHandler.Login)
	router.Run(":8082")

}
