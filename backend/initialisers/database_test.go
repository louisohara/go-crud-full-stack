package initialisers_test

// import (
// 	"testing"

// 	"github.com/louisohara/go-crud/initialisers"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// 	"gorm.io/gorm"
// )

// type MockDB struct {
//     mock.Mock
// }
// func (m *MockDB) Exec(query string, args ...interface{}) *gorm.DB {
//     return nil
// }
// func TestConnectToDB(t *testing.T) {
// 	mockDB := new(MockDB)

// 	gormOpen = func(dsn string, config *gorm.Config) (*gorm.DB, error) {
// 		return mockDB, nil
// 	}
// 	defer func() { gormOpen = gorm.Open}()

// 	initialisers.ConnectToDB()

// 	assert.NotNil(t, DB)

// }