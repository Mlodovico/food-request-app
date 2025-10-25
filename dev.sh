#!/bin/bash

# Food Request App - Development Scripts

case "$1" in
  "start-db")
    echo "Starting database services..."
    docker-compose up -d postgres redis
    echo "Database services started!"
    echo "PostgreSQL: localhost:5432"
    echo "Redis: localhost:6379"
    ;;
  "stop-db")
    echo "Stopping database services..."
    docker-compose down
    echo "Database services stopped!"
    ;;
  "restart-db")
    echo "Restarting database services..."
    docker-compose down
    docker-compose up -d postgres redis
    echo "Database services restarted!"
    ;;
  "logs-db")
    docker-compose logs -f postgres
    ;;
  "connect-db")
    docker exec -it food-request-db psql -U food_user -d food_request_db
    ;;
  "reset-db")
    echo "Resetting database..."
    docker-compose down -v
    docker-compose up -d postgres redis
    echo "Database reset complete!"
    ;;
  "install")
    echo "Installing dependencies..."
    npm install
    echo "Dependencies installed!"
    ;;
  "dev")
    echo "Starting development environment..."
    npm run start:dev
    ;;
  *)
    echo "Usage: $0 {start-db|stop-db|restart-db|logs-db|connect-db|reset-db|install|dev}"
    echo ""
    echo "Commands:"
    echo "  start-db    - Start database services"
    echo "  stop-db     - Stop database services"
    echo "  restart-db  - Restart database services"
    echo "  logs-db     - Show database logs"
    echo "  connect-db  - Connect to PostgreSQL"
    echo "  reset-db    - Reset database (removes all data)"
    echo "  install     - Install npm dependencies"
    echo "  dev         - Start development server"
    exit 1
    ;;
esac
