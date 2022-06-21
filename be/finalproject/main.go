package main

import (
	"database/sql"
	"finalproject/auth"
	"finalproject/middleware"

	"finalproject/module/category"
	"finalproject/module/content"
	usercamp "finalproject/module/user"

	"finalproject/handler"

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
	authService := auth.NewService()
	userHandler := handler.NewUserHandler(userService, auth.NewService())

	contentRepository := content.NewRepository(db)
	contentService := content.NewService(contentRepository)
	contentHandler := handler.NewContentHandler(contentService)

	categoryRepository := category.NewRepository(db)
	categoryService := category.NewService(categoryRepository)
	categoryHandler := handler.NewCategoryHandler(categoryService)

	router := gin.Default()
	api := router.Group("api/v1")

	api.POST("/register", userHandler.RegisterUser)
	api.POST("/login", userHandler.Login)

	api.POST("/content", middleware.AuthMiddleware(authService, userService), contentHandler.SaveContent)
	api.GET("/contents", middleware.AuthMiddleware(authService, userService), contentHandler.FetchAllContentss)
	api.PUT("/updatecontent/:id", middleware.AuthMiddleware(authService, userService), contentHandler.SaveContentUpdate)

	api.POST("/mediacontent", middleware.AuthMiddleware(authService, userService), contentHandler.UploadMedia)
	api.PUT("/updatemediacontent/:id", middleware.AuthMiddleware(authService, userService), contentHandler.UploadMediaByContentID)

	api.POST("/categories", middleware.AuthMiddleware(authService, userService), categoryHandler.SaveCategory)
	api.GET("/categories", middleware.AuthMiddleware(authService, userService), categoryHandler.FetchAllCategories)

	router.Run(":8082")

}
