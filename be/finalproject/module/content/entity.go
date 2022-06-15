package content

import "time"

type Content struct {
	ID           int64  `sql:"not null"`
	IDUser       int64  `sql:"not null"`
	IDCategory   int64  `sql:"not null"`
	Title        string `sql:"not null"`
	Dekripsi     string `sql:"not null"`
	PathImage    string `sql:"null"`
	LastModified time.Time `sql:"not null"`
}
