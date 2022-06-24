package handler

import (
	"finalproject/module/category"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type categoryHandler struct {
	categoryService category.CategoryService
}

func NewCategoryHandler(categoryService category.CategoryService) *categoryHandler {
	return &categoryHandler{categoryService}
}

func (h *categoryHandler) Index(c *gin.Context) {
	categories, err := h.categoryService.FetchAllCategories()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	funcAdd := func(x, y int) int {
		return x + y
	}

	c.HTML(http.StatusOK, "categories.html", gin.H{"categories": categories, "add": funcAdd})
}

func (h *categoryHandler) NewCategory(c *gin.Context) {
	c.HTML(http.StatusOK, "categories_new.html", nil)
}

func (h *categoryHandler) CreateCategory(c *gin.Context) {
	var input category.FormCreateCategoryInput

	err := c.ShouldBind(&input)
	if err != nil {
		input.Error = err
		c.HTML(http.StatusOK, "categories_new.html", input)
		return
	}

	categoryInput := category.CategoryInput{}
	categoryInput.Name = input.Name
	categoryInput.Status = input.Status

	_, err = h.categoryService.SaveCategory(categoryInput)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	c.Redirect(http.StatusFound, "/categories")
}

func (h *categoryHandler) EditCategory(c *gin.Context) {
	categoryId := c.Param("id")
	id, _ := strconv.Atoi(categoryId)

	oldCategory, err := h.categoryService.GetCategoryByID(id)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	c.HTML(http.StatusOK, "categories_edit.html", oldCategory)
}

func (h *categoryHandler) UpdateCategory(c *gin.Context) {
	categoryId := c.Param("id")
	id, _ := strconv.Atoi(categoryId)

	var input category.FormUpdateCategoryInput
	_ = c.ShouldBind(&input)

	input.ID = id
	_, err := h.categoryService.UpdateCategory(input)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}
	c.Redirect(http.StatusFound, "/categories")
}

func (h *categoryHandler) DeleteCategory(c *gin.Context) {
	categoryId := c.Param("id")
	id, _ := strconv.Atoi(categoryId)

	_, err := h.categoryService.DeleteCategory(id)
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	c.Redirect(http.StatusFound, "/categories")
}
