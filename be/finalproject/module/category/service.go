package category

import "errors"

type CategoryService interface {
	SaveCategory(input CategoryInput) (Category, error)
	FetchAllCategories() ([]Category, error)
	GetCategoryByID(ID int) (Category, error)
	UpdateCategory(input FormUpdateCategoryInput) (Category, error)
	DeleteCategory(ID int) (Category, error)
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

	var categoryList []Category
	for _, category := range categories {
		categoryList = append(categoryList, category)
	}
	return categoryList, err
}

func (s *categoryService) GetCategoryByID(ID int) (Category, error) {
	category, err := s.repository.FindByID(ID)
	if err != nil {
		return category, err
	}
	return category, nil
}

func (s *categoryService) UpdateCategory(input FormUpdateCategoryInput) (Category, error) {
	categories, err := s.repository.FindByID(input.ID)

	if err != nil {
		return categories, err
	}

	categories.Name = input.Name
	categories.Status = input.Status

	updatedCategory, err := s.repository.Update(categories)
	if err != nil {
		return updatedCategory, err
	}
	return updatedCategory, err
}

func (s *categoryService) DeleteCategory(ID int) (Category, error) {
	delete, err := s.repository.Delete(ID)
	if err != nil {
		return delete, err
	}

	if delete.ID == 0 {
		return delete, errors.New("Category not found")
	}

	return delete, err
}
