package server

import (
	"net/http"

	"github.com/openzoosim/ozs-web/config"
	"github.com/openzoosim/ozs-web/internal/database"
	"github.com/openzoosim/ozs-web/internal/routers"
)

func RunServer() {

	config := config.LoadEnvVars()

	database.InitializeDBConnection(config.DBConnectionString)

	r := routers.LoadRouters()

	http.ListenAndServe(":3000", r)

}
