package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/louisohara/go-crud-full-stack/backend/api/initialisers"
	"github.com/louisohara/go-crud-full-stack/backend/api/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {
	// look for cookie with authorization header
	tokenString, err := c.Cookie("Authorization")
	// if no authorization header give error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "missing token",
		})
	}

	//IF TOKEN, CHECK THAT TOKEN STRING IS VALID JWT SIGNING METHOD
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error){
	
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	// 
	if claims, ok := token.Claims.(jwt.MapClaims);ok && token.Valid {
		// CHECK THE EXPIRATION TIME 
 		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})
		}

		// FIND USER WITH JWT sub

		var admin models.Admin
		initialisers.DB.First(&admin, claims["sub"])

		if admin.ID == 0 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token claims"})
		}

		c.Set("admin", admin)

		// CONTINUE
		c.Next()

	
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	
}