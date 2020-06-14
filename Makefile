.PHONY: build up

build:
	@docker image build -t product-web .

up:
	@docker run -it -p 4200:80 product-web:latest