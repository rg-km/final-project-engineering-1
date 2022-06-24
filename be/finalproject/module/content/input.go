package content

type FormCreateContentInput struct {
	IDCategory int64  `form:"id_category" json:"id_category" binding:"required"`
	Title      string `form:"title" json:"title" binding:"required"`
	Subtitle   string `form:"subtitle" json:"subtitle" binding:"required"`
	Deskripsi  string `form:"deskripsi" json:"deskripsi" validate:"required"`
}
