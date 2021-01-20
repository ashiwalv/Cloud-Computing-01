start powershell{kubectl port-forward deployment/deployment-conveyor 8081:8081 --namespace="cc-ns"}
start powershell{kubectl port-forward deployment/deployment-sorting 8082:8082 --namespace="cc-ns"}
start powershell{kubectl port-forward deployment/deployment-picking 8083:8083  --namespace="cc-ns"}