package content

type Service interface {
	SaveContent(input FormCreateContentInput, IDUser int) (Content, error)
	UpdateContent(input FormCreateContentInput, IDUser int, IDContent int64) (Content, error)
	SaveMedia(ID int64, fileLocation string) (Content, error)
	SaveMediaid(ID int64, fileLocation string, idcontent int64) (Content, error)
	FetchAllContents() ([]Content, error)
}

type service struct {
	repository Repository
}

func NewService(repository Repository) *service {
	return &service{repository}
}

func (s *service) SaveContent(input FormCreateContentInput, IDUser int) (Content, error) {
	content := Content{}
	content.IDUser = int64(IDUser)
	content.IDCategory = input.IDCategory
	content.Title = input.Title
	content.Deksripsi = input.Deskripsi

	newContent, err := s.repository.Save(content)
	if err != nil {
		return newContent, err
	}

	return newContent, nil
}

func (s *service) UpdateContent(input FormCreateContentInput, IDUser int, IDContent int64) (Content, error) {
	content := Content{}
	content.ID = IDContent
	content.IDUser = int64(IDUser)
	content.IDCategory = input.IDCategory
	content.Title = input.Title
	content.Deksripsi = input.Deskripsi

	newContent, err := s.repository.SaveUpdate(content)
	if err != nil {
		return newContent, err
	}

	return newContent, nil
}

func (s *service) SaveMedia(ID int64, fileLocation string) (Content, error) {
	content, err := s.repository.FindByIDContentuser(ID)
	if err != nil {
		return content, err
	}
	content.IDUser = ID
	content.Path = fileLocation

	updatedContent, err := s.repository.Update(content)
	if err != nil {
		return updatedContent, err
	}

	return updatedContent, nil
}

func (s *service) SaveMediaid(ID int64, fileLocation string, idcontent int64) (Content, error) {
	content, err := s.repository.FindByIDContentuserbyid(ID, idcontent)
	if err != nil {
		return content, err
	}
	content.IDUser = ID
	content.ID = idcontent
	content.Path = fileLocation

	updatedContent, err := s.repository.Update1(content)
	if err != nil {
		return updatedContent, err
	}

	return updatedContent, nil
}

func (s *service) FetchAllContents() ([]Content, error) {
	contentss, err := s.repository.FetchAllContent()
	if err != nil {
		return contentss, err
	}

	return contentss, err
}
