eval $(minikube docker-env)
cd cart-service
docker build -t cart-service:v1 .
cd ../api-gateway
docker build -t api-gateway:v1 .
cd ../front-end-client
docker build -t api-gateway:v1 .