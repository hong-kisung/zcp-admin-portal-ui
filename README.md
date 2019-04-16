# zcp-estimate-ui

### locally
```
# install dependencies
npm install

# run localhost:8080
npm run dev

# build for production
npm run build
```

### build
```
docker build -t zcp-estimate-ui .
docker tag zcp-estimate-ui pog-dev-registry.cloudzcp.io/zcp-estimate/zcp-estimate-ui:0.0.1
docker push pog-dev-registry.cloudzcp.io/zcp-estimate/zcp-estimate-ui:0.0.1

kubectl apply -f k8s/zcp-estimate-ui-deployment.yaml -n zcp-estimate
kubectl apply -f k8s/zcp-estimate-ui-service.yaml -n zcp-estimate
```
