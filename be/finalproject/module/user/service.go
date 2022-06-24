package usercamp

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	RegisterUser(input RegisterUserInput) (User, error)
	UpdateUser(input UpdateUserInput, IDuser int) (User, error)
	Login(input LoginInput) (User, error)
	IsEmailAvailable(input RegisterUserInput) (bool, error)
	GetUserByID(ID int) (User, error)
	GetUser() ([]User, error)
	DeleteUser(ID int) (User, error)
}

type service struct {
	repository Repository
}

func NewService(repository Repository) *service {
	return &service{repository}
}

func (s *service) RegisterUser(input RegisterUserInput) (User, error) {
	user := User{}
	user.Username = input.Username
	user.Email = input.Email

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.MinCost)
	if err != nil {
		return user, err
	}

	user.Password = string(passwordHash)

	newUser, err := s.repository.Save(user)
	if err != nil {
		return newUser, err
	}

	return newUser, nil
}
func (s *service) Login(input LoginInput) (User, error) {
	email := input.Email
	password := input.Password

	user, err := s.repository.FindByEmail(email)
	if err != nil {
		return user, err
	}

	if user.ID == 0 {
		return user, errors.New("no user found on that email")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return user, err
	}

	return user, nil
}
func (s *service) IsEmailAvailable(input RegisterUserInput) (bool, error) {
	email := input.Email

	user, availabel := s.repository.FindByEmail(email)
	if availabel != nil {
		return true, nil
	}

	if user.Email == "" {
		return false, errors.New("not availabel")
	}

	return false, errors.New("not availabel")
}
func (s *service) GetUserByID(ID int) (User, error) {
	user, err := s.repository.FindByID(ID)
	if err != nil {
		return user, err
	}

	if user.ID == 0 {
		return user, errors.New("no user found on with that ID")
	}

	return user, nil
}

func (s *service) UpdateUser(input UpdateUserInput, IDuser int) (User, error) {
	user := User{}
	user.ID = int64(IDuser)
	user.Username = input.Username
	user.Email = input.Email

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.MinCost)
	if err != nil {
		return user, err
	}

	user.Password = string(passwordHash)

	upUser, err := s.repository.Updateuserrepo(user)
	if err != nil {
		return upUser, err
	}

	return upUser, nil
}

func (s *service) GetUser() ([]User, error) {
	users, err := s.repository.FetchAllUser()
	if err != nil {
		return users, err
	}

	var usersList []User
	for _, user := range users {
		usersList = append(usersList, user)
	}

	return users, nil
}

func (s *service) DeleteUser(ID int) (User, error) {
	user, err := s.repository.Delete(ID)
	if err != nil {
		return user, err
	}

	if user.ID == 0 {
		return user, errors.New("no user found on that ID")
	}

	return user, nil
}
