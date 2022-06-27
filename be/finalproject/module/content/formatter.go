package content

import "time"

type ContentFormatter struct {
	ID           int64     `json:"id" sql:"unique"`
	Likes        int64     `json:"likes"`
	Username     string    `json:"username"`
	IDUser       int64     `json:"id_user"`
	Namecategory string    `json:"namacategory"`
	IDCategory   int64     `json:"id_category"`
	Title        string    `json:"title"`
	Subtitle     string    `json:"subtitle"`
	Deskripsi    string    `json:"deskripsi"`
	Path         string    `json:"path"`
	LastModified time.Time `json:"last_modified"`
}

func FormatContent(content Content) ContentFormatter {
	formatter := ContentFormatter{
		ID:           content.ID,
		Likes:        content.Likes,
		Username:     content.Username,
		Namecategory: content.Namecategory,
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
