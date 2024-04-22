package controllers

import (
	"net/http"

	"github.com/louisohara/go-crud-full-stack/backend/api/initialisers"
	"github.com/louisohara/go-crud-full-stack/backend/api/models"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	// CREATE EXPECTED RESULT - SLICE OF USER STRUCTS
	var users []models.User

	// SEARCH WITHIN DATABASE FOR SLICE OF USER STRUCTS
	if err := initialisers.DB.Find(&users).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error searching for users",
		})
		return
	}
	if len(users) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"error": "No users found",
		})
		return
	}
	// RETURN SLICE
	c.JSON(http.StatusOK, 
	users)
}


func GetUserById(c *gin.Context) {
	// GET ID OFF PARAMS
	id := c.Param("id")

	var user models.User
	// SEARCH DB FOR USER STRUCT MATCHING ID 
	if err := initialisers.DB.First(&user, id).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No user found belonging to ID:" + id,
		})
		return
	}
	// RETURN USER
	c.JSON(http.StatusOK, user)
}

func isEmpty(s string) bool {
	return len(s) == 0
}

func CreateUser(c *gin.Context) {

	// GET DATA OFF REQUEST BODY
	var req struct {
		FirstName string
		Surname string
		DOB string
		Email string
	}
	c.Bind(&req)
	// CHECK IF REQUEST BODY IS EMPTY 
	if isEmpty(req.FirstName) || isEmpty(req.Surname) || isEmpty(req.DOB) || isEmpty(req.Email) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User data is missing fields",
		})
		return
	}

	// CREATE A USER WITH REQUEST BODY
	user := models.User{FirstName: req.FirstName, Surname: req.Surname, DOB: req.DOB, Email: req.Email}

	result := initialisers.DB.Create(&user)

	if result.Error != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error":"Failed to create new user",
		})
		return
	}
	// RETURN USER
	c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
	// ID FROM PARAMS
	id := c.Param("id")

	// RECEIVE REQUEST BODY
	var req struct {
		FirstName string
		Surname string
		DOB string
		Email string
	}
	c.Bind(&req)

	var user models.User
	// FIND USER MATCHING ID FROM DATABASE
	if err := initialisers.DB.First(&user, id).Error; err != nil{
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user found belonging to ID:" + id,
 		})
		return
	}
	// UPDATE USER WITH FIELDS FROM REQUEST BODY
	result := initialisers.DB.Model(&user).Updates(models.User{FirstName: req.FirstName, Surname: req.Surname, Email: req.Email, DOB: req.DOB,})

	if result.Error != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to update user",
		})
		return
	}
	// RETURN UPDATED USER
	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	// RECEIVE ID FROM PARAMS
	id := c.Param("id")

	// FIND USER FROM DATABASE WITH MATCHING ID AND DELETE
	if err := initialisers.DB.Delete(&models.User{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete user",
		})
		return
	}
	// RETURN MESSAGE
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully deleted user with ID:" + id,
	})
}