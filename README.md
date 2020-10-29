# microgram-auth
Auth service for the microgram project as part of Udacity's course.

Root project resides at https://github.com/oswaldoferreira/microgram.

### Development

Setup a `.env` file:

```
POSTGRES_USERNAME=<change>
POSTGRES_PASSWORD=<change>
POSTGRES_HOST=<change>
POSTGRES_DB=<change>
JWT_SECRET=<change>
CORS_ORIGIN=http://localhost:4200 # if not modified at the front-end project
```

Run locally:

```
docker build -t microgram-auth .
docker run -p 5000:5000 microgram-auth:latest

› curl localhost:5000
/api/v0/%
```

### Kubernetes example

The `deployment.yml`. The infrastructure bit creation is up to the platform being used (e.g. AWS EKS):

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: microgram-auth
spec:
  replicas: 1
  selector:
    matchLabels:
      app: microgram-auth
  template:
    metadata:
      labels:
        app: microgram-auth
    spec:
      containers:
        - name: microgram-auth-app
          image: <remote>/microgram-auth:latest
          imagePullPolicy: Always
          env:
          - name: POSTGRES_USERNAME
            value: <change>
          - name: POSTGRES_PASSWORD
            value: <change>
          - name: POSTGRES_HOST
            value: <change>
          - name: POSTGRES_DB
            value: <change>
          - name: JWT_SECRET
            value: <change>
          - name: CORS_ORIGIN
            value: <change>
          ports:
            - name: web
              containerPort: 5000
              protocol: TCP
```

The `service.yml` with a simple load balancer. The infrastructure bit creation is up to the platform being used (e.g. AWS ELB).

```yml
apiVersion: v1
kind: Service
metadata:
  name: microgram-auth-lb-svc
spec:
  selector:
    app: microgram-auth
  type: LoadBalancer
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: web
```

Apply both to the Kubernetes cluster:

```
kubectl apply -f deployment.yml
kubectl apply -f load_balancer.yml

› kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
microgram-auth-84689bbdb9-6jfzm   1/1     Running   0          14h
```
