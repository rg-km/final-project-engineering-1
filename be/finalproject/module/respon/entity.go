package respon

import "time"

type Respon struct {
	ID        int64 `url:"id" json:"id"`
	IDContent int64
	IDUser    int64
	Answer    string
	Status    bool
	CreatedAt time.Time
}
