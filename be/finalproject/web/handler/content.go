package handler

import (
	"finalproject/module/content"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type contentHandler struct {
	contentService content.Service
}

func NewContentHandler(contentService content.Service) *contentHandler {
	return &contentHandler{contentService}
}

func (h *contentHandler) Index(c *gin.Context) {

	contents, err := h.contentService.FetchAllContentAndUser()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}
	c.HTML(http.StatusOK, "content.html", gin.H{"contents": contents})
}

func (h *contentHandler) DeleteContent(c *gin.Context) {
	contentId := c.Param("id")
	id, _ := strconv.Atoi(contentId)

	_, err := h.contentService.DeleteContent(id)
	if err != nil {
		fmt.Println(err)
	}

	c.Redirect(http.StatusFound, "/admin/contents")
}
