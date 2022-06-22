package content

type FormCreateContentInput struct {
	IDCategory int64  `form:"id_category" json:"id_category" binding:"required"`
	Title      string `form:"title" json:"title" binding:"required"`
	Deskripsi  string `form:"deskripsi" json:"deskripsi" validate:"required"`
}

type GetContentDetailInput struct {
	ID int `uri:"id" binding:"required"`
}
