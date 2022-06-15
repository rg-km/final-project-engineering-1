package category

import "time"

type Category struct {
	ID        int64     `sql:"not null"`
	Name      string    `sql:"not null"`
	Status    bool      `sql:"not null"`
	CreatedAt time.Time `sql:"not null"`
	UpdatedAt time.Time `sql:"not null"`
}
