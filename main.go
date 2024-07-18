package main

import (
	"github.com/openzoosim/ozs-web/cmd"
	logger "github.com/openzoosim/ozs-web/internal/logging"
)

func main() {
	logger.InitializeLogger()
	logger.Log.Info("Logger is initialized!")
	cmd.CommandHandler()
}
