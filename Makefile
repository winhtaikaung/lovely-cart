REDIS_PORT=6379
MONGODB_PORT=27017
RABBIT_MQ_PORT=5672
RABBIT_MQ_ADMIN_PORT=15672
RABBITMQ_USERNAME=username
RABBITMQ_PASSWORD=mybunny
NAMESPACE=default



.PHONY: start-frontend
start-frontend:
		$(eval API_URL := $(shell minikube service --url api-gateway))
		kubectl create configmap cart-frontend-env --from-literal=API_URL=${API_URL} --validate=false
		kubectl apply -f k8s/cart-frontend/service.yaml
		kubectl apply -f k8s/cart-frontend/deployment.yaml
		@echo 
		@echo Access your app via following url 
		@minikube service --url cart-frontend
.PHONY: start-db
start-db:
		@eval $$(docker-machine env -u)
		docker run -d --name myRedis -p ${REDIS_PORT}:6379 redis 
		docker start myRedis
		docker run -d --name rabbit-mq-server -p ${RABBIT_MQ_PORT}:5672 -p ${RABBIT_MQ_ADMIN_PORT}:15672 -e RABBITMQ_USERNAME=${RABBITMQ_USERNAME} -e RABBITMQ_PASSWORD=${RABBITMQ_PASSWORD} bitnami/rabbitmq:latest 
		docker start rabbit-mq-server

.PHONY: start 
start:
		make start-db
		
		sh docker-build.sh
		kubectl apply -f k8s/external.yaml
		kubectl apply -f k8s/cart-services/configmap.yaml
		kubectl apply -f k8s/api-gateway/configmap.yaml
		
		kubectl apply -f k8s/cart-services/deployment.yaml;
		kubectl apply -f k8s/api-gateway/deployment.yaml;

		kubectl apply -f k8s/cart-services/service.yaml;
		kubectl apply -f k8s/api-gateway/service.yaml;
		
		@echo 
		@echo Access your api via following url 
		@minikube service --url api-gateway
		make start-frontend

.PHONY: destroy 
destroy:
		
		@eval $$(minikube docker-env);
		-kubectl delete service cart-frontend -n ${NAMESPACE};
		kubectl delete service api-gateway -n ${NAMESPACE};
		kubectl delete service cart -n ${NAMESPACE};
		kubectl delete service rabbitmq	-n ${NAMESPACE};
		kubectl delete service redis -n ${NAMESPACE};
		kubectl delete deployment cart-frontend-deploy -n ${NAMESPACE};
		kubectl delete deployment api-gateway-deploy -n ${NAMESPACE};
		kubectl delete deployment cart-deploy -n ${NAMESPACE};
		kubectl delete configmaps --all -n ${NAMESPACE};
		kubectl delete pods --all -n ${NAMESPACE};
		make stop
		
		
.PHONY: update 
update:
		sh docker-build.sh		
		kubectl set image deployment/cart-deploy cart=cart-service:v1 --record
		kubectl set image deployment/api-gateway-deploy api-gateway=api-gateway:v1 --record
		kubectl set image deployment/cart-frontend-deploy cart-frontend=cart-frontend:v1 --record

.PHONY: stop 
stop:
		@eval $$(docker-machine env -u)
		docker stop myRedis 
		docker container rm myRedis
		docker stop rabbit-mq-server 
		docker container rm rabbit-mq-server  
		# minikube stop