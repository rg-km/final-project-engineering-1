package dashboard

type DashboardService interface {
	CountUser() (int, error)
	CountContent() (int, error)
	CountCategory() (int, error)
}

type service struct {
	repository DashboardRepository
}

func NewService(repository DashboardRepository) *service {
	return &service{repository}
}

func (s *service) CountUser() (int, error) {
	return s.repository.CountUser()
}

func (s *service) CountContent() (int, error) {
	return s.repository.CountContent()
}

func (s *service) CountCategory() (int, error) {
	return s.repository.CountCategory()
}
