package controllers

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/louisohara/go-crud-full-stack/backend/api/initialisers"
	"github.com/louisohara/go-crud-full-stack/backend/api/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetFile(c *gin.Context) {

	// URL PARAM GIVES USER ID
	userID := c.Param("id")

	// SEARCH DATABASE FOR FILE BELONGING TO USER ID
	var file models.File
	if err := initialisers.DB.Where("user_id = ?", userID).Last(&file).Error; err != nil {
		// Handle error
		if errors.Is(err, gorm.ErrRecordNotFound) {
            // No file found for user
            c.JSON(http.StatusNotFound, gin.H{
                "message": "No files found for user",
            })
            return
        }
		
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve file",
		})
		return
	}
	// RETURN FILE URL
	c.JSON(http.StatusOK, gin.H{
		"file": file.FilePath,
	})
}

func AddFile(c *gin.Context) {
	// RECEIVE ID FROM PARAMS
	userIDStr := c.Param("id")

	// CONVERT USERID STRING TO INT
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}
	// RECEIVE FILE FROM FORMDATA
	file, err := c.FormFile("file")
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error" : "Failed to upload file",
		})
		return
	}
	// UPLOAD FILE TO ASSETS FOLDER

	filePath := "assets/uploads/"+file.Filename
	if err = c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error" : "Failed to save file to server",
		})
		return
	}
	newFile := models.File{UserID: uint(userID), FilePath: filePath}

	// CREATE FILE INSTANCE AND SAVE TO DATABASE
	result := initialisers.DB.Create(&newFile)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create new file in database",
		})
	}
	c.JSON(http.StatusCreated, gin.H{
	 "file":newFile.FilePath,
	})
	
}