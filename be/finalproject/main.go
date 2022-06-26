package main

import (
	"database/sql"
	"finalproject/auth"
	"finalproject/middleware"

	"finalproject/module/category"
	"finalproject/module/content"
	"finalproject/module/respon"
	usercamp "finalproject/module/user"

	"finalproject/handler"

	"fmt"
	"log"

	"github.com/gin-contrib/multitemplate"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func dataBase() (db *sql.DB) {

	db, err := sql.Open("sqlite3", "./db/forum-camp.db")

	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println("koneksi berhasil")
	return db

}

func main() {

	router := GetGinRoute()
	router.Run(":8082")

}

func GetGinRoute() *gin.Engine {
	userRepository := usercamp.NewRepository(dataBase())
	userService := usercamp.NewService(userRepository)
	authService := auth.NewService()
	userHandler := handler.NewUserHandler(userService, auth.NewService())
	contentRepository := content.NewRepository(dataBase())
	contentService := content.NewService(contentRepository)
	contentHandler := handler.NewContentHandler(contentService)

	responRepository := respon.NewRepository(dataBase())
	responService := respon.NewService(responRepository)
	responHandler := handler.NewResponHandler(responService)

	categoryRepository := category.NewRepository(dataBase())
	categoryService := category.NewService(categoryRepository)
	categoryHandler := handler.NewCategoryHandler(categoryService)
	authService := auth.NewService()
	router := gin.Default()

	router.HTMLRender = loadTemplates("./web/templates")
	router.Static("/css", "./web/assets/css")
	router.Static("/js", "./web/assets/js")
	router.Static("/webfonts", "./web/assets/webfonts")

	api := router.Group("api/v1")
	api.POST("/register", userHandler.RegisterUser)
	api.POST("/login", userHandler.Login)
	api.GET("/userbyid", middleware.AuthMiddleware(authService, userService), userHandler.FetchUserById)
	api.PUT("/updateuser", middleware.AuthMiddleware(authService, userService), userHandler.UpdateUser)

	api.POST("/content", middleware.AuthMiddleware(authService, userService), contentHandler.SaveContent)
	api.GET("/contents", middleware.AuthMiddleware(authService, userService), contentHandler.FetchAllContentss)
	api.GET("/contentbyiduser", middleware.AuthMiddleware(authService, userService), contentHandler.FetchContentByiduser)
	api.GET("/searchbycontent", middleware.AuthMiddleware(authService, userService), contentHandler.SearchContentByKeyword)
	api.PUT("/updatecontent/:id", middleware.AuthMiddleware(authService, userService), contentHandler.SaveContentUpdate)
	api.POST("/likecontent", middleware.AuthMiddleware(authService, userService), contentHandler.ActionlikeContent)

	api.POST("/mediacontent", middleware.AuthMiddleware(authService, userService), contentHandler.UploadMedia)
	api.PUT("/updatemediacontent/:id", middleware.AuthMiddleware(authService, userService), contentHandler.UploadMediaByContentID)

	api.POST("/respon", middleware.AuthMiddleware(authService, userService), responHandler.SaveRespon)
	api.PUT("/updaterespon/:id", middleware.AuthMiddleware(authService, userService), responHandler.SaveUpdateRespon)
	api.GET("/responscontent/:id", middleware.AuthMiddleware(authService, userService), responHandler.FetchAllResponByContentId)

	api.POST("/categories", middleware.AuthMiddleware(authService, userService), categoryHandler.SaveCategory)
	api.GET("/categories", middleware.AuthMiddleware(authService, userService), categoryHandler.FetchAllCategories)
	api.GET("/searchbycategory", middleware.AuthMiddleware(authService, userService), categoryHandler.SearchCategoryByKeyword)

	return router // TODO: replace this
}
