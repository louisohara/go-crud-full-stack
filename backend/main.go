package main

import (
	// "github.com/louisohara/go-crud-full-stack/backend/api/controllers"
	// "github.com/louisohara/go-crud-full-stack/backend/api/initialisers"
	// "github.com/louisohara/go-crud-full-stack/backend/api/middleware"

	"backend/api/controllers"
	"backend/api/initialisers"
	"backend/api/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initialisers.LoadEnvVariables()
	initialisers.ConnectToDB()
}

func main() {
	router := gin.Default()

	//CORS
 	router.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"*"},
    AllowMethods:     []string{"GET", "POST","PUT", "DELETE"},
    AllowHeaders:     []string{"Origin"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    // AllowOriginFunc: func(origin string) bool {
    //   return origin == "https://github.com"
    // },
    // MaxAge: 12 * time.Hour,
  }))

	router.Static("/assets", "./assets")
	router.MaxMultipartMemory = 8 << 20
	
	// endpoints
	// router.GET("/", func(c *gin.Context) {c.JSON(http.StatusOK, gin.H{
	// 	"message": "system running",
	// })})
	// router.GET("/", controllers.HomepageHandler)
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
