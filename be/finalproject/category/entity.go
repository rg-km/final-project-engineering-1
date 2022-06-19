package category

type Category struct {
	ID     int64  `sql:"not null" json:"id"`
	Name   string `sql:"not null" json:"name"`
	Status bool   `sql:"not null" json:"status"`
}
