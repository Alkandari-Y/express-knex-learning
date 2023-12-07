Install Docker Desktop

Docker Commands:

- Download and run redis container

```bash
docker pull redis
docker run -p 6379:6379 --name <container_name> -d redis
docker exec -it <container_name> redis-cli
```
