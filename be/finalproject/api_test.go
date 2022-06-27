package main

import (
	"encoding/json"
	usercamp "finalproject/module/user"
	"net/http"
	"net/http/httptest"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

var _ = Describe("Api", func() {

	route := GetGinRoute()

	Describe("/login", func() {
		When("the username and password are correct", func() {
			It("should return a successful login response", func() {
				wr := httptest.NewRecorder()
				req := httptest.NewRequest("POST", "/api/v1/login?email=gsgh@gmail.com&password=eeee", nil)
				route.Handler().ServeHTTP(wr, req)

				Expect(wr.Result().StatusCode).To(Equal(http.StatusOK))

				loginSuccessResponse := usercamp.UserFormatter{}
				json.NewDecoder(wr.Body).Decode(&loginSuccessResponse)
				Expect(loginSuccessResponse.Username).To(Equal("amusfq"))
			})
		})
		When("the username and password are incorrect", func() {
			It("should return unauthorized", func() {
				wr := httptest.NewRecorder()
				req := httptest.NewRequest("POST", "/api/v1/login?username=diraa&password=123", nil)
				route.Handler().ServeHTTP(wr, req)

				Expect(wr.Result().StatusCode).To(Equal(http.StatusUnauthorized))
			})
		})
	})

})
