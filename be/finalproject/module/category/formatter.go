package category

type CategoryFormatter struct {
	ID        int64     `json:"id" sql:"unique"`
	Name      string    `json:"name"`
	Status    bool      `json:"status"`
}

func FormatCategory(category Category) CategoryFormatter {
	formatter := CategoryFormatter{
		ID:        category.ID,
		Name:      category.Name,
		Status:    category.Status,
	}

	return formatter
}
