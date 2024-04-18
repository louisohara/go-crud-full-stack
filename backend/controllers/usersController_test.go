package controllers_test

// import (
// 	"encoding/json"
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/gin-gonic/gin"
// 	"github.com/go-playground/assert/v2"
// 	"github.com/louisohara/go-crud-full-stack/controllers"
// 	"github.com/louisohara/go-crud-full-stack/models"
// )

// func SetUpRouter() *gin.Engine{
//     router := gin.Default()
//     return router
// }

// // func TestHomepageHandler(t *testing.T) {
// //     mockResponse := `{"message":"TEST ROUTE"}`
// //     r := SetUpRouter()
// //     r.GET("/", controllers.HomepageHandler)
// //     req, _ := http.NewRequest("GET", "/", nil)
// //     w := httptest.NewRecorder()
// //     r.ServeHTTP(w, req)

// //     responseData, _ := io.ReadAll(w.Body)
// //     assert.Equal(t, mockResponse, string(responseData))
// //     assert.Equal(t, http.StatusOK, w.Code)
// // }
// func TestGetUsers(t *testing.T) {
// 	r := SetUpRouter()
// 	r.GET("/api/users", controllers.GetUsers)
// 	req, _ := http.NewRequest("GET", "/api/users", nil)
// 	w := httptest.NewRecorder()
// 	r.ServeHTTP(w, req)

// 	var users []models.User
// 	json.Unmarshal(w.Body.Bytes(), &users)

// 	assert.Equal(t, http.StatusOK, w.Code)
// 	// assert.NotEmpty(t, users)
// }

// func TestGetUserById(t *testing.T) {

// }

// func TestCreateUser(t *testing.T) {

// }

// func TestUpdateUser(t *testing.T) {

// }
// func TestDeleteUser(t *testing.T) {

// }