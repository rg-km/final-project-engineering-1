package handler

import (
	"finalproject/helper"
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

func (h *categoryHandler) SaveCategory(c *gin.Context) {
	var input category.CategoryInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Kategori gagal ditambahkan", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newCategory, err := h.categoryService.SaveCategory(input)
	if err != nil {
		response := helper.APIResponse("Kategori gagal ditambahkan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := category.FormatCategory(newCategory)
	response := helper.APIResponse("Kategori berhasil ditambahkan", http.StatusOK, "success", formatter)

	c.JSON(http.StatusOK, response)
}

func (h *categoryHandler) FetchAllCategories(c *gin.Context) {
	categories, err := h.categoryService.FetchAllCategories()
	if err != nil {
		response := helper.APIResponse("Data Kategori gagal ditampilkan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := helper.APIResponse("Data kategori berhasil ditampilkan", http.StatusOK, "success", categories)

	c.JSON(http.StatusOK, response)
}

func (h *categoryHandler) DeleteCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response := helper.APIResponse("Failed delete category", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
	}

	_, err = h.categoryService.DeleteCategory(id)
	if err != nil {
		response := helper.APIResponse("Category not Found", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{"id": id}

	response := helper.APIResponse("Category has been deleted", http.StatusOK, "success", data)
	c.JSON(http.StatusOK, response)
}