package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string `json:"firstname"`
	Surname string `json:"surname"`
	DOB string `json:"dob"`
	Email string `json:"email"`
}

type Admin struct {
	gorm.Model
	Email string 
	Password string
}

type File struct {
  	gorm.Model
	User 	User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
    UserID   uint   `json:"user_id"` 
    FilePath string `json:"file_path"`
}