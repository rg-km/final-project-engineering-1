package content

import "time"

type Content struct {
	ID           int64 `url:"id" json:"id"`
	Likes        int64
	IDUser       int64
	IDCategory   int64
	Title        string
	Subtitle     string
	Deksripsi    string
	Path         string
	LastModified time.Time
}
