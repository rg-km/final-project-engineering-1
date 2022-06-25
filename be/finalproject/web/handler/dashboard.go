package handler

import (
	"finalproject/module/dashboard"
	"net/http"

	"github.com/gin-gonic/gin"
)

type dashboardHandler struct {
	dashboard dashboard.DashboardService
}

func NewDashboardHandler(dashboard dashboard.DashboardService) *dashboardHandler {
	return &dashboardHandler{dashboard}
}

func (h *dashboardHandler) Index(c *gin.Context) {

	countUser, err := h.dashboard.CountUser()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	countCategory, err := h.dashboard.CountCategory()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	countContent, err := h.dashboard.CountContent()
	if err != nil {
		c.HTML(http.StatusInternalServerError, "error.html", nil)
		return
	}

	c.HTML(http.StatusOK, "dashboard.html", gin.H{"countUser": countUser, "countCategory": countCategory, "countContent": countContent})
}
