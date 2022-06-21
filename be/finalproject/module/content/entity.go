package content

import "time"

type Content struct {
	ID           int64 `url:"id_content" json:"id_content"`
	IDUser       int64
	IDCategory   int64
	Title        string
	Deksripsi    string
	Path         string
	LastModified time.Time
}
