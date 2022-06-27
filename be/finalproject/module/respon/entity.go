package respon

import "time"

type Respon struct {
	ID        int64     `url:"id" json:"id"`
	IDContent int64     `json:"id_content"`
	IDUser    int64     `json:"id_user"`
	Answer    string    `json:"answer"`
	Status    bool      `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}
