package main

import (
	"database/sql"
	"finalproject/auth"
	"finalproject/category"
	// "finalproject/content"
	"finalproject/handler"
	usercamp "finalproject/module/user"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {

	db, err := sql.Open("sqlite3", "./db/forum-camp.db")

	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println("koneksi berhasil")

	userRepository := usercamp.NewRepository(db)
	userService := usercamp.NewService(userRepository)
	userHandler := handler.NewUserHandler(userService, auth.NewService())

	// contentRepository := content.NewRepository(db)
	// contentService := content.NewService(contentRepository)
	// contentHandler := handler.NewContentHandler(contentService)

	categoryRepository := category.NewRepository(db)
	categoryService := category.NewService(categoryRepository)
	categoryHandler := handler.NewCategoryHandler(categoryService)

	router := gin.Default()
	api := router.Group("api/v1")

	api.POST("/register", userHandler.RegisterUser)
	api.POST("/login", userHandler.Login)

	// api.POST("/content", contentHandler.SaveContent)

	api.POST("/categories", categoryHandler.SaveCategory)
	api.GET("/categories", categoryHandler.FetchAllCategories)

	router.Run(":8082")

}
