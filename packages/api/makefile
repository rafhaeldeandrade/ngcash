dev:
	docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d --build

prod:
	docker-compose --env-file ./.env -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d --build
