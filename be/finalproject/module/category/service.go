package category

type CategoryService interface {
	SaveCategory(input CategoryInput) (Category, error)
	FetchAllCategories() ([]Category, error)
	SearchCategoryByKeyword(keyword string) ([]Category, error)
}

type categoryService struct {
	repository CategoryRepository
}

func NewService(repository CategoryRepository) *categoryService {
	return &categoryService{repository}
}

func (s *categoryService) SaveCategory(input CategoryInput) (Category, error) {
	category := Category{}

	category.Name = input.Name
	category.Status = input.Status

	newCategory, err := s.repository.Save(category)
	if err != nil {
		return newCategory, err
	}
	return newCategory, err
}

func (s *categoryService) FetchAllCategories() ([]Category, error) {
	categories, err := s.repository.FetchAllCategories()
	if err != nil {
		return categories, err
	}

	return categories, err
}
func (s *categoryService) SearchCategoryByKeyword(keyword string) ([]Category, error) {
	categories, err := s.repository.SearchCategoryByKeyword(keyword)
	if err != nil {
		return categories, err
	}

	return categories, err
}
