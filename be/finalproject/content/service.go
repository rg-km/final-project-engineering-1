package content

import "time"

type Service interface {
	SaveContent(input FormCreateContentInput) (Content, error)
}

type service struct {
	repository Repository
}

func NewService(repository Repository) *service {
	return &service{repository}
}

func (s *service) SaveContent(input FormCreateContentInput) (Content, error) {
	content := Content{}
	content.IDUser = input.IDUser
	content.IDCategory = input.IDCategory
	content.Title = input.Title
	content.Deskripsi = input.Deskripsi
	content.PathImage = input.PathImage
	content.LastModified = time.Now()

	newContent, err := s.repository.Save(content)
	if err != nil {
		return newContent, err
	}

	return newContent, nil
}
