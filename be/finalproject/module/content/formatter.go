package content

import "time"

type ContentFormatter struct {
	Likes				 int64 	   `json:"likes"`
	ID           int64     `json:"id" sql:"unique"`
	IDUser       int64     `json:"id_user"`
	IDCategory   int64     `json:"id_category"`
	Title        string    `json:"title"`
	Subtitle     string    `json:"subtitle"`
	Deskripsi    string    `json:"deskripsi"`
	Path         string    `json:"path"`
	LastModified time.Time `json:"last_modified"`
}

func FormatContent(content Content) ContentFormatter {
	formatter := ContentFormatter{
		Likes:				content.Likes,
		ID:           content.ID,
		IDUser:       content.IDUser,
		IDCategory:   content.IDCategory,
		Title:        content.Title,
		Subtitle:     content.Subtitle,
		Deskripsi:    content.Deksripsi,
		Path:         content.Path,
		LastModified: content.LastModified,
	}

	return formatter
}
