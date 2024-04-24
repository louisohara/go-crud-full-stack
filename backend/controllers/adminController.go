package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/louisohara/go-crud-full-stack/backend/api/initialisers"
	"github.com/louisohara/go-crud-full-stack/backend/api/models"

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
	// bind request body to req struct - if fail return error
	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
		return
	}
// password hashing using bcrypt
	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H {
			"error": "Failed to hash password",
		})
		return
	}
	// initialise admin model using req fields and create user in database
	admin := models.Admin{Email: req.Email, Password: string(hash)}
	result := initialisers.DB.Create(&admin)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create admin user",
		})
		return
	}
	// return user in database
	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	// get email/pass off req

	var req struct {
		Email string
		Password string
	}
	// bind request body to req struct - if fail return error

	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read request",
		})
		return
	}
	// declare admin model and search database for admin instance where email = req.email
	var admin models.Admin
	initialisers.DB.First(&admin, "email = ?", req.Email)
	 
	if admin.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}
// compare hashed password in admin db instance with hashed password of req
	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})

		return
	}
	// generate token with HS256 signature and give expiry time
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": admin.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	// sign token with secret key
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
		"token": tokenString,
	})
}

func Validate(c *gin.Context) {
	admin, _ := c.Get("admin")

	c.JSON(http.StatusOK, admin)
}