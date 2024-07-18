package services

import (
	"context"
	"fmt"

	"github.com/openzoosim/ozs-web/internal/database"
	"github.com/openzoosim/ozs-web/internal/models"
)

func CreateNewUser(newUser models.NewUserRequest) {
	sql := `
		INSERT INTO public.users (
			email,
			username,
			password_hash
		) 
		VALUES ($1,$2,$3)
	`
	_, err := database.DB.Exec(context.Background(), sql, newUser.Email, newUser.Username, newUser.Password)
	if err != nil {
		fmt.Print(err.Error())
	}
}
