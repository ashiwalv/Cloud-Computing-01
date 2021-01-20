echo "`n" ; echo ">>>>  Available Nodes >>>";
kubectl get node -o wide ;


echo "`n" ; echo ">>>>  Available Deployments >>>";
kubectl get deployment --namespace cc-ns -o jsonpath="{..image}" -o wide  ; 


echo "`n" ; echo ">>>>  Available Pods >>>";
kubectl get pods --namespace cc-ns -o jsonpath="{..image}" -o wide ; 


echo "`n" ; echo ">>>>  Available Services >>>";
kubectl get svc --namespace cc-ns -o jsonpath="{..image}" -o wide ; 


echo "`n" ; echo ">>>>  Available Endpoints >>>";
kubectl get ep --namespace cc-ns -o jsonpath="{..image}" -o wide;


echo "`n" ; echo ">>>>  Available ReplicaSet >>>";
kubectl get rs --namespace cc-ns -o jsonpath="{..image}" -o wide ;

echo "`n" ;