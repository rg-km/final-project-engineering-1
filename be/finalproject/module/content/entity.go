package content

import (
	"time"
)

type Content struct {
	ID           int64     `url:"id" json:"id"`
	Likes        int64     `json:"likes"`
	IDUser       int64     `json:"id_user"`
	IDCategory   int64     `json:"id_category"`
	Title        string    `json:"title"`
	Subtitle     string    `json:"subtitle"`
	Deksripsi    string    `json:"deksripsi"`
	Path         string    `json:"path"`
	LastModified time.Time `json:"last_modified"`
	Username     string    `json:"username"`
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
