package handler

import (
	"finalproject/module/content"
	"net/http"

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
