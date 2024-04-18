package controllers

import (
	"net/http"
	"os"
	"time"

	"backend/api/initialisers"
	"backend/api/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// get email/pass off req
	var req struct {
		Email string
		Password string
	}
	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H {
			"error": "Failed to hash password",
		})
		return
	}
	admin := models.Admin{Email: req.Email, Password: string(hash)}
	result := initialisers.DB.Create(&admin)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create admin user",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	var req struct {
		Email string
		Password string
	}
	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
		return
	}
	var admin models.Admin
	initialisers.DB.First(&admin, "email = ?", req.Email)

	if admin.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})

		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": admin.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create JWT token",
		})

		return
	}
	// SET TOKEN IN COOKIES
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600 * 24, "", "", false, true)

	// IF YOU WANT TO RETURN TOKEN STRING TO SET IN LOCALSTORAGE
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
	})
}

func Validate(c *gin.Context) {
	admin, _ := c.Get("admin")

	c.JSON(http.StatusOK, admin)
}