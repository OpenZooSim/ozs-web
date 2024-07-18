package cmd

import (
	"github.com/openzoosim/ozs-web/internal/database"
	logger "github.com/openzoosim/ozs-web/internal/logging"
)

func RunMigrations() {
	database.RunMigrations()
	logger.Log.Info("Migrations: Unimplemented!")
}
