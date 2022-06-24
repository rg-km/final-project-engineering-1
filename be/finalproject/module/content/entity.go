package content

import (
	"time"
)

type Content struct {
	ID           int64 `url:"id" json:"id"`
	IDUser       int64
	IDCategory   int64
	Title        string
	Subtitle     string
	Deksripsi    string
	Path         string
	LastModified time.Time
}

type ContentUser struct {
	ID           int64 `url:"id" json:"id"`
	IDUser       int64
	IDCategory   int64
	Title        string
	Subtitle     string
	Deksripsi    string
	Path         string
	LastModified time.Time
	Username     string
	Email        string
}
