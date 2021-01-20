echo "`n" ; echo ">>>>  Available Nodes >>>";
kubectl get node -o wide ; 
echo "`n" ; echo ">>>>  Available Deployments >>>";
kubectl get deployment -o wide  ; 
echo "`n" ; echo ">>>>  Available Pods >>>";
kubectl get pod -o wide ; 
echo "`n" ; echo ">>>>  Available Services >>>";
kubectl get svc -o wide ; 
echo "`n" ; echo ">>>>  Available Endpoints >>>";
kubectl get ep -o wide;
echo "`n" ; echo ">>>>  Available Endpoints >>>";
kubectl get rs -o wide;
echo "`n" ;

