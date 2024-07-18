package api_users

import "time"

type UserEntity struct {
	Id uint
	CreatedAt time.Time
	ModifiedAt time.Time
	IsArchived bool
	Email string
	Username string
	IsVerified bool
	PasswordHash string
	LastLogin time.Time
	FailedLoginAttempts uint
	IsBanned bool
	BanReason string
	CanUseAPIKeys bool

}