package category

type CategoryInput struct {
	Name   string `json:"name" binding:"required"`
	Status bool   `json:"status" binding:"required"`
}

type FormCreateCategoryInput struct {
	Name   string `form:"name" binding:"required"`
	Status bool   `form:"status" binding:"required"`
	Error  error
}

type FormUpdateCategoryInput struct {
	ID int
	Name   string `form:"name" binding:"required"`
	Status bool   `form:"status" binding:"required"`
}
