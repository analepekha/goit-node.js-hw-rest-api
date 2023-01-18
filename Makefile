run:
	docker run -d -p 4000:3000 --name goitapp anastasiialepekha/goitapp

stop:
	docker stop goitapp