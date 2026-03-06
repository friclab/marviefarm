.PHONY: install up down shell migrate fresh seed artisan tinker

# Bootstrap the entire project from scratch
install:
	docker compose build
	docker compose run --rm app composer create-project laravel/laravel . --prefer-dist
	cp .env.example .env
	@$(MAKE) _copy-stubs
	docker compose run --rm app php artisan key:generate
	docker compose up -d
	@echo "Waiting for DB..." && sleep 5
	docker compose exec app php artisan migrate
	@echo ""
	@echo "Done! App running at http://localhost:8080"

# Copy domain stubs into the Laravel app
_copy-stubs:
	cp _scaffold/migrations/*.php database/migrations/
	cp _scaffold/Models/*.php app/Models/
	cp _scaffold/Controllers/*.php app/Http/Controllers/
	cp _scaffold/routes/web.php routes/web.php

up:
	docker compose up -d

down:
	docker compose down

shell:
	docker compose exec app bash

migrate:
	docker compose exec app php artisan migrate

fresh:
	docker compose exec app php artisan migrate:fresh --seed

artisan:
	docker compose exec app php artisan $(cmd)

tinker:
	docker compose exec app php artisan tinker
