package main

import (
	"database/sql"
	"finalproject/auth"
	"finalproject/handler"
	"finalproject/module/category"
	"finalproject/module/content"
	usercamp "finalproject/module/user"
	webHandler "finalproject/web/handler"

	"fmt"
	"log"
	"path/filepath"

	"github.com/gin-contrib/multitemplate"
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

	contentRepository := content.NewRepository(db)
	contentService := content.NewService(contentRepository)
	contentHandler := handler.NewContentHandler(contentService)

	categoryRepository := category.NewRepository(db)
	categoryService := category.NewService(categoryRepository)
	categoryHandler := handler.NewCategoryHandler(categoryService)

	// CMS ADMIN
	dashboardWebHandler := webHandler.NewDashboardHandler()
	categoryWebHandler := webHandler.NewCategoryHandler(categoryService)

	router := gin.Default()

	router.HTMLRender = loadTemplates("./web/templates")
	router.Static("/css", "./web/assets/css")
	router.Static("/js", "./web/assets/js")
	router.Static("/webfonts", "./web/assets/webfonts")

	api := router.Group("api/v1")
	api.POST("/register", userHandler.RegisterUser)
	api.POST("/login", userHandler.Login)

	// api.POST("/content", contentHandler.SaveContent)
	api.GET("/content/:id", contentHandler.FetchContentById)

	api.POST("/categories", categoryHandler.SaveCategory)
	api.GET("/categories", categoryHandler.FetchAllCategories)

	// Routing : CMS ADMIN
	router.GET("/dashboard", dashboardWebHandler.Index)

	router.GET("/categories", categoryWebHandler.Index)
	router.GET("/categories/new", categoryWebHandler.NewCategory)
	router.POST("/create-category", categoryWebHandler.CreateCategory)
	router.GET("/categories/edit/:id", categoryWebHandler.EditCategory)
	router.POST("/categories/update/:id", categoryWebHandler.UpdateCategory)
	router.DELETE("/categories/delete/:id", categoryWebHandler.DeleteCategory)

	router.Run(":8082")
}

func loadTemplates(templatesDir string) multitemplate.Renderer {
	r := multitemplate.NewRenderer()

	layouts, err := filepath.Glob(templatesDir + "/layouts/*")
	if err != nil {
		panic(err.Error())
	}

	includes, err := filepath.Glob(templatesDir + "/**/*")
	if err != nil {
		panic(err.Error())
	}

	for _, include := range includes {
		layoutCopy := make([]string, len(layouts))
		copy(layoutCopy, layouts)
		files := append(layoutCopy, include)
		r.AddFromFiles(filepath.Base(include), files...)
	}
	return r
}
