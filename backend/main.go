package main

import (
	"github.com/louisohara/go-crud-full-stack/backend/api/controllers"
	"github.com/louisohara/go-crud-full-stack/backend/api/initialisers"
	"github.com/louisohara/go-crud-full-stack/backend/api/middleware"

	"github.com/gin-gonic/gin"
)

func init() {
	initialisers.LoadEnvVariables()
	initialisers.ConnectToDB()
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length, Set-Cookie")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}


func main() {
	router := gin.Default()

	//CORS
 	router.Use(corsMiddleware())

	router.Static("/assets", "./assets")
	router.MaxMultipartMemory = 8 << 20
	
	// endpoints
	router.POST("/signup", controllers.Signup)
	router.POST("/login", controllers.Login)

	// authenticated endpoints
	authGroup := router.Group("/api", middleware.RequireAuth)
	{
		authGroup.GET("/validate", controllers.Validate)

		authGroup.GET("/users", controllers.GetUsers)
		
		authGroup.GET("/users/:id", controllers.GetUserById)
		authGroup.PUT("/users/:id", controllers.UpdateUser)
		authGroup.POST("/users", controllers.CreateUser)
		authGroup.DELETE("/users/:id", controllers.DeleteUser)
		
		authGroup.GET("/users/:id/files", controllers.GetFile) 
		authGroup.POST("/users/:id/files", controllers.AddFile) 
	}

	router.Run()

}
