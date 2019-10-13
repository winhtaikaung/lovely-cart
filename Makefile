REDIS_PORT=6379
MONGODB_PORT=27017
RABBIT_MQ_PORT=5672
RABBIT_MQ_ADMIN_PORT=15672
RABBITMQ_USERNAME=username
RABBITMQ_PASSWORD=mybunny

.PHONY: start 
start:
		# @eval $$(minikube docker-env) ;
		docker run -d --name myRedis -p ${REDIS_PORT}:6379 redis 
		# @eval $$(minikube docker-env) ;
		docker run -d --name rabbit-mq-server -p ${RABBIT_MQ_PORT}:5672 -p ${RABBIT_MQ_ADMIN_PORT}:15672 -e RABBITMQ_USERNAME=${RABBITMQ_USERNAME} -e RABBITMQ_PASSWORD=${RABBITMQ_PASSWORD} bitnami/rabbitmq:latest 
		# @eval $$(minikube docker-env) ;
		docker run -d --name myMongodb -p ${MONGODB_PORT}:27017 mongo:latest 
		# @eval $$(minikube docker-env) ;
		
		# sh docker-build.sh
		# kubectl apply -f k8s/external.yaml
		# kubectl apply -f k8s/api-gateway/configmap.yaml
		# kubectl apply -f k8s/cart-services/configmap.yaml
		# kubectl apply -f k8s/api-gateway/deploymant.yaml
		# kubectl apply -f k8s/cart-services/deploymant.yaml
		# kubectl apply -f k8s/api-gateway/service.yaml
		# kubectl apply -f k8s/cart-services/service.yaml

.PHONY: stop 
stop:
		# @eval $$(minikube docker-env)
		docker stop myRedis 
		docker container rm myRedis
		docker stop rabbit-mq-server 
		docker container rm rabbit-mq-server  
		docker stop myMongodb
		docker container rm myMongodb