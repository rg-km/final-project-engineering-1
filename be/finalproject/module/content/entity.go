package content

import "time"

type Content struct {
	Likes				 int64
	ID           int64 `url:"id" json:"id"`
	IDUser       int64
	IDCategory   int64
	Title        string
	Subtitle     string
	Deksripsi    string
	Path         string
	LastModified time.Time
}
