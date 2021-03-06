package respon

type Service interface {
	SaveRespon(input FormCreateResponInput, IDUser int) (Respon, error)
	SaveUpdateRespon(input FormUpdateResponInput, IDRespon int, IDUser int) (Respon, error)
	FetchAllResponByContentId(idContent int64) ([]Respon, error)
}

type service struct {
	repository Repository
}

func NewService(repository Repository) *service {
	return &service{repository}
}

func (s *service) SaveRespon(input FormCreateResponInput, IDUser int) (Respon, error) {
	respon := Respon{}
	respon.IDContent = input.IDContent
	respon.IDUser = int64(IDUser)
	respon.Answer = input.Answer
	respon.Status = true

	newRespon, err := s.repository.Save(respon)
	if err != nil {
		return newRespon, err
	}

	return newRespon, nil
}

func (s *service) SaveUpdateRespon(input FormUpdateResponInput, IDRespon int, IDUser int) (Respon, error) {

	respons, err := s.repository.FindByResponIDUserID(IDRespon, IDUser)
	if err != nil {
		return respons, err
	}

	respons.Answer = input.Answer
	respons.Status = true
	updateRespon, err := s.repository.Update(respons)
	if err != nil {
		return updateRespon, err
	}

	return updateRespon, nil
}

func (s *service) FetchAllResponByContentId(idContent int64) ([]Respon, error) {
	respons, err := s.repository.FetchAllResponByContentId(idContent)
	if err != nil {
		return respons, err
	}

	return respons, nil
}
