package controllers

import (
	"errors"
	"net/http"
	"strconv"

	"backend/api/initialisers"
	"backend/api/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetFile(c *gin.Context) {

	// Get the user ID from the URL parameter
	userID := c.Param("id")

	// Query the database to fetch the file associated with the user ID
	var file models.File
	if err := initialisers.DB.Where("user_id = ?", userID).Last(&file).Error; err != nil {
		// Handle error
		if errors.Is(err, gorm.ErrRecordNotFound) {
            // No file found for the user
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
	// Return the file URL in the response
	c.JSON(http.StatusOK, gin.H{
		"file": file.FilePath,
	})
}

func AddFile(c *gin.Context) {
	
	userIDStr := c.Param("id")

	// Convert userIDStr to an integer
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}
	file, err := c.FormFile("file")
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error" : "Failed to upload file",
		})
		return
	}
	// Upload the file to specific dst.

	filePath := "assets/uploads/"+file.Filename
	if err = c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error" : "Failed to save file to server",
		})
		return
	}
	newFile := models.File{UserID: uint(userID), FilePath: filePath}

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