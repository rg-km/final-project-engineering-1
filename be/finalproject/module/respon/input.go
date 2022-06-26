package respon

type FormCreateResponInput struct {
	IDContent int64  `json:"id_content" binding:"required"`
	Answer    string `form:"answer" json:"answer" binding:"required"`
}

type FormUpdateResponInput struct {
	Answer string `form:"answer" json:"answer" binding:"required"`
}
