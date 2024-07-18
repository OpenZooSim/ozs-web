package api_auth

type NewUserRequest struct {
	Email string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}