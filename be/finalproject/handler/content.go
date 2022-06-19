package handler

import (
	"finalproject/content"
	"finalproject/helper"
	"net/http"

	"github.com/gin-gonic/gin"
)

type contentHandler struct {
	contentService content.Service
	// authService    auth.Service
}

func NewContentHandler(contentService content.Service) *contentHandler {
	return &contentHandler{contentService}
}

func (h *contentHandler) SaveContent(c *gin.Context) {
	var input content.FormCreateContentInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Save content failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newContent, err := h.contentService.SaveContent(input)

	if err != nil {
		response := helper.APIResponse("Save content failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := content.FormatContent(newContent)

	response := helper.APIResponse("Content has been saved", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}
