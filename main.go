package main

import (
	"log"
	"net/http"
)

func main() {
	// Устанавливаем обработчик для статических файлов
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	// Устанавливаем обработчик для POST-запросов
	//http.HandleFunc("/submit", submitHandler)

	// Запускаем сервер
	log.Println("Сервер запущен на http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
