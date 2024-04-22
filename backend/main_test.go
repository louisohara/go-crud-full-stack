package main_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert"
	"github.com/louisohara/go-crud-full-stack/backend/api/controllers"

	"github.com/louisohara/go-crud-full-stack/backend/api/models"
)

// SETUP ROUTER FUNCTION
func setUpRouter() *gin.Engine {
	r := gin.Default()
	return r
}
func TestSignup(t *testing.T) {
    r := setUpRouter()
    r.POST("/signup", controllers.Signup)

   // EXAMPLE REQUEST BODY 
    requestBody := `{"email": "test@example.com", "password": "password123"}`

 	// CREATE HTTP REQUEST WITH EXAMPLE BODY
    req, _ := http.NewRequest("POST", "/signup", strings.NewReader(requestBody))

    // RESPONSE RECORDER
    w := httptest.NewRecorder()

    // SERVER HTTP REQUEST
    r.ServeHTTP(w, req)

    // VERIFY RESPONSE CODES
    if w.Code != http.StatusOK {
        t.Errorf("expected status code %d, got %d", http.StatusOK, w.Code)
    }

    // VERIFY RESPONSE BODY
    expectedResponseBody := `{}`
    actualResponseBody := w.Body.String()
    if expectedResponseBody != actualResponseBody {
        t.Errorf("expected response body %s, got %s", expectedResponseBody, actualResponseBody)
    }
}


func TestLogin(t *testing.T) {
    r := setUpRouter()
    r.POST("/login", controllers.Login)

    // EXAMPLE REQUEST BODY 
    requestBody := `{"email": "test@example.com", "password": "password123"}`

    // CREATE HTTP REQUEST WITH EXAMPLE BODY
    req, _ := http.NewRequest("POST", "/login", strings.NewReader(requestBody))

    // RESPONSE RECORDER 
    w := httptest.NewRecorder()

    // SERVE HTTP REQUEST
    r.ServeHTTP(w, req)

    // VERIFY RESPONSE CODES
    if w.Code != http.StatusOK {
        t.Errorf("expected status code %d, got %d", http.StatusOK, w.Code)
    }

    // VERIFY RESPONSE BODY
    expectedResponseBody := `{"message":"Login successful"}`
    actualResponseBody := w.Body.String()
    if expectedResponseBody != actualResponseBody {
        t.Errorf("expected response body %s, got %s", expectedResponseBody, actualResponseBody)
    }

    // VERIFY AUTHORIZATION COOKIE
    cookie := w.Header().Get("Set-Cookie")
    if !strings.Contains(cookie, "Authorization") {
        t.Error("expected Authorization cookie in the response")
    }
}


func TestGetUsers(t *testing.T) {
	// SETUP ROUTER AND DEFINE ENDPOINT HANDLER
	r := setUpRouter()
	r.GET("/api/users", controllers.GetUsers)

	// CREATE HTTP REQUEST WITH EXAMPLE BODY AND SETUP RESPONSE RECORDER 
	req, _ := http.NewRequest("GET", "/api/users", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	// UNMARSHAL RESPONSE INTO USER SLICE

	var users []models.User
	json.Unmarshal(w.Body.Bytes(), &users)

	// VERIFY RESPONSE CODES
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetUserById(t *testing.T) {
	// SETUP ROUTER AND DEFINE ENDPOINT HANDLER
	r := setUpRouter()
	r.GET("/api/users/:id", controllers.GetUserById)

	// CREATE HTTP REQUEST WITH EXAMPLE BODY AND SETUP RESPONSE RECORDER 
	req, _ := http.NewRequest("GET", "/api/users/5", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	// UNMARSHAL RESPONSE INTO USER
	var user models.User
	json.Unmarshal(w.Body.Bytes(), &user)

	// VERIFY RESPONSE STATUS CODE
	assert.Equal(t, http.StatusOK, w.Code)

	// CREATE HTTP REQUEST WITH EXAMPLE REQUEST BODY 2
	req2, _ := http.NewRequest("GET", "/api/users/999", nil)
    w2 := httptest.NewRecorder()
    r.ServeHTTP(w2, req2)


    // UNMARSHAL RESPONSE INTO ERROR MESSAGE
    var errorMessage map[string]string
    json.Unmarshal(w2.Body.Bytes(), &errorMessage)

	// VERIFY RESPONSE STATUS CODES AND ERROR MESSAGES
    assert.Equal(t, http.StatusBadRequest, w2.Code)
    assert.Equal(t, "No user found belonging to ID:999", errorMessage["error"])
}

func TestCreateUser(t *testing.T) {
	// SETUP ROUTER AND DEFINE ENDPOINT HANDLER

	r := setUpRouter()
	r.POST("/api/users", controllers.CreateUser)

	// CREATE HTTP REQUEST WITH EXAMPLE BODY AND SETUP RESPONSE RECORDER 
	requestBody := `{"firstname": "John", "surname": "Doe", "dob": "2001-01-01", "email": "john.doe@example.com"}`

	req, _ := http.NewRequest("POST", "/api/users", strings.NewReader(requestBody))

	w := httptest.NewRecorder()

    // HTTP REQUEST
    r.ServeHTTP(w, req)

	// UNMARSHAL RESPONSE BODY INTO USER
	var user models.User
	json.Unmarshal(w.Body.Bytes(), &user)

    // VERIFY RESPONSE STATUS CODES
    if w.Code != http.StatusCreated {
        t.Errorf("expected status code %d, got %d", http.StatusCreated, w.Code)
    }
}