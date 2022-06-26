package handler

import (
	"finalproject/helper"
	"finalproject/module/respon"
	usercamp "finalproject/module/user"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type responHandler struct {
	responService respon.Service
}

func NewResponHandler(responService respon.Service) *responHandler {
	return &responHandler{responService}
}

func (h *responHandler) SaveRespon(c *gin.Context) {
	var input respon.FormCreateResponInput

	inputidtoken := c.MustGet("currentUser").(usercamp.User)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Item respon gagal disimpan", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	newRespon, err := h.responService.SaveRespon(input, int(inputidtoken.ID))

	if err != nil {
		response := helper.APIResponse("Item respon gagal disimpan", http.StatusBadRequest, "error", err)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := respon.FormatRespon(newRespon)
	response := helper.APIResponse("Item respon berhasil disimpan", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}

func (h *responHandler) SaveUpdateRespon(c *gin.Context) {
	var input respon.FormUpdateResponInput
	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := helper.FormatValidationError(err)
		errorMessage := gin.H{"errors": errors}

		response := helper.APIResponse("Item respon gagal diupdate", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}
	responId, _ := strconv.Atoi(c.Param("id"))
	inputidtoken := c.MustGet("currentUser").(usercamp.User)

	updateRespon, err := h.responService.SaveUpdateRespon(input, responId, int(inputidtoken.ID))

	if err != nil {
		response := helper.APIResponse("Item respon gagal diupdate", http.StatusBadRequest, "error", err)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := respon.FormatRespon(updateRespon)
	response := helper.APIResponse("Item respon berhasil diupdate", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}

func (h *responHandler) FetchAllResponByContentId(c *gin.Context) {
	contentId, _ := strconv.Atoi(c.Param("id"))
	respons, err := h.responService.FetchAllResponByContentId(int64(contentId))
	if err != nil {
		reponse := helper.APIResponse("Data respon gagal diambil", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, reponse)
		return
	}
	response := helper.APIResponse("Data respon berhasil diambil", http.StatusOK, "success", respons)

	c.JSON(http.StatusOK, response)
}
