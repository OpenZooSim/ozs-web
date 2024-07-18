package main

import (
	"net/http"

	"github.com/openzoosim/ozs-web/config"
	"github.com/openzoosim/ozs-web/database"
	"github.com/openzoosim/ozs-web/routers"
)

func main() {

	config := config.LoadEnvVars()

	database.InitializeDBConnection(config.DBConnectionString)

	r := routers.LoadRouters()

	http.ListenAndServe(":3000", r)
}
