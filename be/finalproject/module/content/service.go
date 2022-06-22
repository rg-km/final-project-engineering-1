package content


type ContentService interface {
	SaveContent(input FormCreateContentInput, IDUser int) (Content, error)
	UpdateContent(input FormCreateContentInput, IDUser int, IDContent int64) (Content, error)
	FetchAllContents() ([]Content, error)
	GetContentByID(input GetContentDetailInput) (Content, error)
}

type contentService struct {
	repository ContentRepository
}

func NewService(repository ContentRepository) *contentService {
	return &contentService{repository}
}

func (s *contentService) SaveContent(input FormCreateContentInput, IDUser int) (Content, error) {
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

func (s *contentService) UpdateContent(input FormCreateContentInput, IDUser int, IDContent int64) (Content, error) {
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

func (s *contentService) FetchAllContents() ([]Content, error) {
	contentss, err := s.repository.FetchAllContent()
	if err != nil {
		return contentss, err
	}

	return contentss, err
}

func (s *contentService) GetContentByID(input GetContentDetailInput) (Content, error) {
	contentDetail, err := s.repository.FindByContentID(input.ID)
	if err != nil {
		return contentDetail, err
	}

	return contentDetail, err
}