# Food Request Application

A NestJS application built with Domain-Driven Design (DDD) and Ports & Adapters architecture for handling food requests.

## Architecture Overview

This application follows Clean Architecture principles with the following layers:

- **Domain Layer**: Contains entities, value objects, and repository interfaces
- **Application Layer**: Contains use cases and ports (interfaces)
- **Infrastructure Layer**: Contains adapters implementing the ports
- **Presentation Layer**: Contains controllers and DTOs

## Project Structure

```
src/
├── domain/
│   ├── entities/           # Domain entities
│   ├── value-objects/      # Value objects
│   └── repositories/       # Repository interfaces
├── application/
│   ├── use-cases/          # Application use cases
│   └── ports/              # Port interfaces
├── infrastructure/
│   ├── adapters/           # Repository implementations
│   ├── filters/            # Exception filters
│   └── errors/             # Domain errors
└── presentation/
    ├── controllers/        # REST controllers
    └── dto/               # Data Transfer Objects
```

## Features

- Create food requests with multiple items
- Get food requests by ID or customer ID
- Update food request status (approve, reject, fulfill, cancel)
- Browse available food items
- Input validation and error handling
- In-memory data storage (easily replaceable with database)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Food Items

- `GET /food-items` - Get all food items
- `GET /food-items/:id` - Get food item by ID
- `GET /food-items/category/:category` - Get food items by category

### Food Requests

- `POST /food-requests` - Create a new food request
- `GET /food-requests/:id` - Get food request by ID
- `GET /food-requests/customer/:customerId` - Get food requests by customer ID
- `PUT /food-requests/:id/approve` - Approve a food request
- `PUT /food-requests/:id/reject` - Reject a food request
- `PUT /food-requests/:id/fulfill` - Fulfill a food request
- `PUT /food-requests/:id/cancel` - Cancel a food request

## Example Usage

### Create a Food Request

```bash
curl -X POST http://localhost:3000/food-requests \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUST-001",
    "items": [
      {
        "foodItemId": "ITEM-001",
        "quantity": 2,
        "specialInstructions": "Extra cheese"
      },
      {
        "foodItemId": "ITEM-003",
        "quantity": 1
      }
    ],
    "notes": "Please deliver to the back entrance"
  }'
```

### Get Food Request by ID

```bash
curl http://localhost:3000/food-requests/REQ-1234567890-abc123def
```

### Approve a Food Request

```bash
curl -X PUT http://localhost:3000/food-requests/REQ-1234567890-abc123def/approve
```

## Domain Model

### Food Request Status Flow

```
PENDING → APPROVED → FULFILLED
    ↓         ↓
REJECTED   CANCELLED
```

### Value Objects

- `RequestId`: Unique identifier for food requests
- `FoodItemId`: Unique identifier for food items
- `Quantity`: Positive integer representing item quantity
- `FoodRequestStatus`: Enum representing request status

### Entities

- `FoodItem`: Represents a food item with price, category, etc.
- `FoodRequestItem`: Represents an item within a food request
- `FoodRequest`: Main aggregate root containing request details and business logic

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Development

### Adding New Features

1. Define domain entities and value objects in the domain layer
2. Create repository interfaces in the domain layer
3. Implement use cases in the application layer
4. Create adapters in the infrastructure layer
5. Add controllers and DTOs in the presentation layer
6. Update the module configuration

### Replacing In-Memory Storage

To replace the in-memory repositories with database implementations:

1. Create new repository implementations in `src/infrastructure/adapters/`
2. Update the module configuration to use the new implementations
3. Add database dependencies as needed

## License

ISC
