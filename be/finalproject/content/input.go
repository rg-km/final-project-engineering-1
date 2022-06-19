package content

type FormCreateContentInput struct {
	IDUser     int64  `json:"id_user" binding:"required"`
	IDCategory int64  `json:"id_category" binding:"required"`
	Title      string `json:"title" binding:"required"`
	Deskripsi  string `json:"deskripsi" binding:"required"`
	PathImage  string `json:"path_image" binding:"required"`
}
