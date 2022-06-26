package respon

import "time"

type ResponFormatter struct {
	ID        int64     `json:"id" sql:"unique"`
	IDContent int64     `json:"id_content"`
	IDUser    int64     `json:"id_user"`
	Answer    string    `json:"answer"`
	Status    bool      `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

func FormatRespon(respon Respon) ResponFormatter {
	formatter := ResponFormatter{
		ID:        respon.ID,
		IDContent: respon.IDContent,
		IDUser:    respon.IDUser,
		Answer:    string(respon.Answer),
		Status:    respon.Status,
		CreatedAt: respon.CreatedAt,
	}

	return formatter
}
