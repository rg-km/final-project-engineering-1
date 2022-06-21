package handler

import (
	"finalproject/helper"
	"finalproject/module/content"
	usercamp "finalproject/module/user"
	"fmt"
	"net/http"
	"strconv"

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

	inputidtoken := c.MustGet("currentUser").(usercamp.User)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Item kontent gagal disimpan", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newContent, err := h.contentService.SaveContent(input, int(inputidtoken.ID))

	if err != nil {
		response := helper.APIResponse("Item kontent gagal disimpan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := content.FormatContent(newContent)

	response := helper.APIResponse("Item kontent berhasil disimpan", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}

func (h *contentHandler) UploadMedia(c *gin.Context) {
	file, err := c.FormFile("content")
	if err != nil {
		data := gin.H{"is_uploaded": false}
		response := helper.APIResponse("Gagal upload kontent(Image/Vidio)", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	userID := c.MustGet("currentUser").(usercamp.User)

	path := fmt.Sprintf("media/%d-%s", userID.ID, file.Filename)

	err = c.SaveUploadedFile(file, path)
	if err != nil {
		data := gin.H{"is_uploaded": false}
		response := helper.APIResponse("Gagal upload kontent(Image/Vidio)", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = h.contentService.SaveMedia(userID.ID, path)
	if err != nil {
		data := gin.H{"is_uploaded": false}
		response := helper.APIResponse("Gagal upload kontent(Image/Vidio)", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{"is_uploaded": true}
	response := helper.APIResponse("Berhasil upload kontent(Image/Vidio)", http.StatusOK, "success", data)

	c.JSON(http.StatusOK, response)
}

func (h *contentHandler) UploadMediaByContentID(c *gin.Context) {
	file, err := c.FormFile("content")
	if err != nil {
		data := gin.H{"is_uploaded": false}
		response := helper.APIResponse("Gagal upload kontent(Image/Vidio)", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	contentId, _ := strconv.Atoi(c.Param("id"))

	userID := c.MustGet("currentUser").(usercamp.User)

	path := fmt.Sprintf("media/%d-%s", userID.ID, file.Filename)

	err = c.SaveUploadedFile(file, path)
	if err != nil {
		data := gin.H{"is_uploaded": false}
		response := helper.APIResponse("Gagal upload kontent(Image/Vidio)", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = h.contentService.SaveMediaid(userID.ID, path, int64(contentId))
	if err != nil {
		data := gin.H{"is_uploaded": false}
		response := helper.APIResponse("Gagal upload kontent(Image/Vidio)", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{"is_uploaded": true}
	response := helper.APIResponse("Berhasil upload kontent(Image/Vidio)", http.StatusOK, "success", data)

	c.JSON(http.StatusOK, response)
}

func (h *contentHandler) SaveContentUpdate(c *gin.Context) {
	var input content.FormCreateContentInput
	contentId, _ := strconv.Atoi(c.Param("id"))
	inputidtoken := c.MustGet("currentUser").(usercamp.User)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Item kontent gagal diupdate", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newContent, err := h.contentService.UpdateContent(input, int(inputidtoken.ID), int64(contentId))

	if err != nil {
		response := helper.APIResponse("Item kontent gagal diupdate", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := content.FormatContent(newContent)

	response := helper.APIResponse("Item kontent berhasil diupdate", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}

func (h *contentHandler) FetchAllContentss(c *gin.Context) {
	content, err := h.contentService.FetchAllContents()
	if err != nil {
		response := helper.APIResponse("Data Konten gagal ditampilkan", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := helper.APIResponse("Data Kontent berhasil ditampilkan", http.StatusOK, "success", content)

	c.JSON(http.StatusOK, response)
}
