# Food Request App - Docker Setup

## Como usar

### 1. Iniciar os serviços
```bash
docker-compose up -d
```

### 2. Parar os serviços
```bash
docker-compose down
```

### 3. Ver logs
```bash
docker-compose logs -f postgres
```

### 4. Acessar o banco diretamente
```bash
docker exec -it food-request-db psql -U food_user -d food_request_db
```

## Serviços incluídos

- **PostgreSQL**: Banco de dados principal na porta 5432
- **Redis**: Cache/sessões na porta 6379

## Variáveis de ambiente

As seguintes variáveis são configuradas automaticamente:
- `POSTGRES_DB=food_request_db`
- `POSTGRES_USER=food_user`
- `POSTGRES_PASSWORD=food_password`

## Volumes

Os dados são persistidos em volumes Docker:
- `postgres_data`: Dados do PostgreSQL
- `redis_data`: Dados do Redis

## Scripts de inicialização

O arquivo `init-scripts/01-init-database.sql` é executado automaticamente na primeira inicialização do PostgreSQL.
