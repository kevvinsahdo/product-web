.PHONY: build up

build:
	@docker image build --no-cache -t product-web .

up:
	@docker run -it -p 4200:80 product-web:latest