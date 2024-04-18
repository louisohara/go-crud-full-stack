package controllers_test

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"backend/api/controllers"
)

func setUpRouter() *gin.Engine {
	r := gin.Default()
	return r
}
func TestSignup(t *testing.T) {

}

func TestLogin(t *testing.T) {
    r := setUpRouter()
    r.POST("/login", controllers.Login)

    // Prepare a request body with email and password
    requestBody := `{"email": "test@example.com", "password": "password123"}`

    // Create a new HTTP request with the prepared body
    req, _ := http.NewRequest("POST", "/login", strings.NewReader(requestBody))

    // Create a new response recorder to capture the response
    w := httptest.NewRecorder()

    // Serve the HTTP request
    r.ServeHTTP(w, req)

    // Verify the response status code
    if w.Code != http.StatusOK {
        t.Errorf("expected status code %d, got %d", http.StatusOK, w.Code)
    }

    // Verify the response body
    expectedResponseBody := `{"message":"Login successful"}`
    actualResponseBody := w.Body.String()
    if expectedResponseBody != actualResponseBody {
        t.Errorf("expected response body %s, got %s", expectedResponseBody, actualResponseBody)
    }

    // Verify the presence of the Authorization cookie
    cookie := w.Header().Get("Set-Cookie")
    if !strings.Contains(cookie, "Authorization") {
        t.Error("expected Authorization cookie in the response")
    }
}

func TestValidate(t *testing.T) {
	
}
