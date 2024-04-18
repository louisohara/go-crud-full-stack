package initialisers

import (
	"log"
	"os"

	"backend/api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error

	dsn := os.Getenv("DATABASE_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	err = DB.AutoMigrate(&models.Admin{})
    if err != nil {
        log.Fatal("Failed to perform database migrations:", err)
    }

	err = DB.AutoMigrate(&models.User{})
    if err != nil {
        log.Fatal("Failed to perform database migrations:", err)
    }
	
	err = DB.AutoMigrate(&models.File{})
    if err != nil {
        log.Fatal("Failed to perform database migrations:", err)
    }

    log.Println("Database connection established and migrations performed successfully")

}

// db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer db.Close()

// 	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, surname TEXT, email TEXT, dob TEXT)")
// 	if err != nil {
// 		log.Fatal(err)
// 	}


func Seed() error{
	
	files := []models.File{
		{UserID: 1, FilePath: "http://localhost:3000/assets/uploads/favicon.ico"},
        {UserID: 2, FilePath: "http://localhost:3000/assets/uploads/hand.png"},}
	
	for _, file := range files {
		if err := DB.Create(&file).Error; err != nil {
			return err
		}
	}
	
	return nil

}