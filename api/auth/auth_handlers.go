package api_auth

import (
	"net/http"
)

func RegisterNewUser(w http.ResponseWriter, r *http.Request) {
	newUser := &NewUserRequest{Email: "ddl@chicken@.com", Username: "MZERO", Password: "12345"}
	CreateNewUser(*newUser)
	w.Write([]byte("DONE"))
}