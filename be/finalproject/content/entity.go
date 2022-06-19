package content

import "time"

type Content struct {
	ID           int64 `sql:"not null"`
	IDUser       int64
	IDCategory   int64
	Title        string
	Deskripsi    string
	PathImage    string
	LastModified time.Time
}
