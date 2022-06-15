package respon

import "time"

type Respon struct {
	ID        int64     `sql:"not null"`
	IDContent int64     `sql:"not null"`
	IDUser    int64     `sql:"not null"`
	Answer    string    `sql:"not null"`
	Status    bool      `sql:"not null"`
	CreatedAt time.Time `sql:"not null"`
}
