package content

import "time"

type Content struct {
	ID           int64
	IDUser       int64
	IDCategory   int64
	Title        string
	Deksripsi    string
	Path         string
	LastModified time.Time
}
