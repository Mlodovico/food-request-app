import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { FoodRequestModule } from "../../src/food-request.module";
import { CreateFoodRequestDto } from "../../src/presentation/dto/create-food-request.dto";

describe("FoodRequestController (E2E)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FoodRequestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /food-requests/order - should create a new food request", async () => {
    const payload: CreateFoodRequestDto = {
      customerId: "CUST-001",
      items: [
        { foodItemId: "ITEM-001", quantity: 2 },
        { foodItemId: "ITEM-003", quantity: 1 },
      ],
      notes: "Please deliver to the back entrance",
    };

    const response = await request(app.getHttpServer())
      .post("/food-requests/order")
      .send(payload)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.customerId).toBe(payload.customerId);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.notes).toBe(payload.notes);
  });

  it("GET /food-requests/get-order/:id - should return a food request by ID", async () => {
    const foodRequestId = "REQ-1234567890-abc123def"; // Use um ID válido aqui

    const response = await request(app.getHttpServer())
      .get(`/food-requests/get-order/${foodRequestId}`)
      .expect(200);

    expect(response.body).toHaveProperty("id", foodRequestId);
    expect(response.body).toHaveProperty("customerId");
    expect(response.body).toHaveProperty("items");
  });

  it("PUT /food-requests/:id/approve - should approve a food request", async () => {
    const foodRequestId = "REQ-1234567890-abc123def"; // Use um ID válido aqui

    await request(app.getHttpServer())
      .put(`/food-requests/${foodRequestId}/approve`)
      .expect(204);
  });
});
