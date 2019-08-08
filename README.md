# zcp-admin-portal-ui

### locally
```
# install dependencies
npm install

# run localhost:8080
npm run dev
```

### build
```
# build for production
npm run build

docker build -t zcp-admin-portal-ui .
docker tag zcp-admin-portal-ui pog-dev-registry.cloudzcp.io/zcp-estimate/zcp-admin-portal-ui:0.0.1
docker push pog-dev-registry.cloudzcp.io/zcp-estimate/zcp-admin-portal-ui:0.0.1

kubectl apply -f k8s/zcp-admin-portal-ui-deployment.yaml -n zcp-admin
kubectl apply -f k8s/zcp-admin-portal-ui-service.yaml -n zcp-admin
```
