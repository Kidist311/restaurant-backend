import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Restaurant Backend API",
    version: "1.0.0",
    description: "API documentation for the Restaurant Backend",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "Password@123",
          },
        },
      },
  
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "Password@123",
          },
        },
      },

      CreateCategoryRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            example: "Pizza",
          },
        },
      },
      
      UpdateCategoryRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            example: "Italian Pizza",
          },
        },
      },
      CreateFoodRequest: {
  type: "object",
  required: ["name", "price", "categoryId"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
      example: "Margherita Pizza",
    },

    description: {
      type: "string",
      example: "Classic pizza with tomato and mozzarella",
    },

    price: {
      type: "number",
      format: "double",
      minimum: 0,
      exclusiveMinimum: true,
      example: 450,
    },

    imageUrl: {
      type: "string",
      example: "https://example.com/pizza.jpg",
    },

    categoryId: {
      type: "string",
      format: "uuid",
      example: "550e8400-e29b-41d4-a716-446655440000",
    },
  },
},

UpdateFoodRequest: {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      example: "Large Margherita Pizza",
    },

    description: {
      type: "string",
      example: "Updated pizza description",
    },

    price: {
      type: "number",
      format: "double",
      minimum: 0,
      exclusiveMinimum: true,
      example: 500,
    },

    imageUrl: {
      type: "string",
      example: "https://example.com/new-pizza.jpg",
    },

    categoryId: {
      type: "string",
      format: "uuid",
    },

    available: {
      type: "boolean",
      example: true,
    },
  },
},

CreateOrderRequest: {
  type: "object",
  required: ["items"],
  properties: {
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["foodId", "quantity"],
        properties: {
          foodId: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          quantity: {
            type: "integer",
            minimum: 1,
            example: 2,
          },
        },
      },
    },
  },
},

UpdateOrderStatusRequest: {
  type: "object",
  required: ["status"],
  properties: {
    status: {
      type: "string",
      enum: [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "COMPLETED",
        "CANCELLED",
      ],
      example: "CONFIRMED",
    },
  },
},

CreateReservationRequest: {
  type: "object",
  required: [
    "name",
    "email",
    "phone",
    "reservationDate",
    "reservationTime",
    "numberOfGuests"
  ],
  properties: {
    name: {
      type: "string",
      minLength: 2,
      example: "John Doe",
    },

    email: {
      type: "string",
      format: "email",
      example: "john@example.com",
    },

    phone: {
      type: "string",
      minLength: 9,
      example: "0912345678",
    },

    message: {
      type: "string",
      example: "Birthday dinner",
    },

    reservationDate: {
      type: "string",
      format: "date",
      example: "2026-08-15",
    },

    reservationTime: {
      type: "string",
      example: "18:00",
    },

    numberOfGuests: {
      type: "integer",
      minimum: 1,
      example: 4,
    },
  },
},

UpdateReservationStatusRequest: {
  type: "object",
  required: ["status"],
  properties: {
    status: {
      type: "string",
      enum: [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED",
      ],
      example: "CONFIRMED",
    },
  },
},

    },
  },

  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User registered successfully",
          },
          "400": {
            description: "Validation failed",
          },
          "409": {
            description: "Email already exists",
          },
        },
      },
    },
  
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
          },
          "401": {
            description: "Invalid credentials",
          },
          "400": {
            description: "Validation failed",
          },
        },
      },
    },
  
    "/api/v1/auth/profile": {
      get: {
        tags: ["Auth"],
        summary: "Get current user profile",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Profile retrieved successfully",
          },
          "401": {
            description: "Authentication required",
          },
        },
      },
    },
    "/api/v1/categories": {
  post: {
    tags: ["Category"],
    summary: "Create a new category",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateCategoryRequest",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Category created successfully",
      },
      "400": {
        description: "Validation failed",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Only owners can create categories",
      },
    },
  },

  get: {
    tags: ["Category"],
    summary: "Get all categories",
    responses: {
      "200": {
        description: "Categories retrieved successfully",
      },
    },
  },
},

"/api/v1/categories/{id}": {
  get: {
    tags: ["Category"],
    summary: "Get category by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      "200": {
        description: "Category retrieved successfully",
      },
      "404": {
        description: "Category not found",
      },
    },
  },

  patch: {
    tags: ["Category"],
    summary: "Update a category",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdateCategoryRequest",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Category updated successfully",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Only owners can update categories",
      },
      "404": {
        description: "Category not found",
      },
    },
  },

  delete: {
    tags: ["Category"],
    summary: "Delete a category",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      "200": {
        description: "Category deleted successfully",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Only owners can delete categories",
      },
      "404": {
        description: "Category not found",
      },
    },
  },
},

  "/api/v1/foods": {
  post: {
    tags: ["Food"],
    summary: "Create a new food",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateFoodRequest",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Food created successfully",
      },
      "400": {
        description: "Validation failed",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Only owners can create food",
      },
    },
  },

  get: {
    tags: ["Food"],
    summary: "Get all foods",
    responses: {
      "200": {
        description: "Foods retrieved successfully",
      },
    },
  },
},

"/api/v1/foods/{id}": {
  get: {
    tags: ["Food"],
    summary: "Get food by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      "200": {
        description: "Food retrieved successfully",
      },
      "404": {
        description: "Food not found",
      },
    },
  },

  patch: {
    tags: ["Food"],
    summary: "Update food",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdateFoodRequest",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Food updated successfully",
      },
      "400": {
        description: "Validation failed",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Only owners can update food",
      },
      "404": {
        description: "Food not found",
      },
    },
  },

  delete: {
    tags: ["Food"],
    summary: "Delete food",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses: {
      "200": {
        description: "Food deleted successfully",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Only owners can delete food",
      },
      "404": {
        description: "Food not found",
      },
    },
  },
},

"/api/v1/reservations": {
  post: {
    tags: ["Reservation"],
    summary: "Create a reservation",
    description:
      "Creates a reservation. Both guests and authenticated customers can make reservations.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateReservationRequest",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Reservation created successfully",
      },
      "400": {
        description:
          "Validation failed or reservation capacity is unavailable",
      },
    },
  },

  get: {
    tags: ["Reservation"],
    summary: "Get all reservations",
    description:
      "Retrieves all reservations. Staff or owner access is required.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Reservations retrieved successfully",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Access denied",
      },
    },
  },
},

"/api/v1/reservations/my": {
  get: {
    tags: ["Reservation"],
    summary: "Get my reservations",
    description:
      "Retrieves reservations belonging to the authenticated customer.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Reservations retrieved successfully",
      },
      "401": {
        description: "Authentication required",
      },
    },
  },
},

"/api/v1/reservations/{id}/status": {
  patch: {
    tags: ["Reservation"],
    summary: "Update reservation status",
    description:
      "Updates the status of a reservation.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Reservation ID",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref:
              "#/components/schemas/UpdateReservationStatusRequest",
          },
        },
      },
    },
    responses: {
      "200": {
        description:
          "Reservation status updated successfully",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Access denied",
      },
      "404": {
        description: "Reservation not found",
      },
    },
  },
},

"/api/v1/orders": {
  post: {
    tags: ["Order"],
    summary: "Create a new order",
    description: "Creates a new order for the authenticated customer.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateOrderRequest",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Order created successfully",
      },
      "400": {
        description: "Validation failed",
      },
      "401": {
        description: "Authentication required",
      },
    },
  },

  get: {
    tags: ["Order"],
    summary: "Get all orders",
    description: "Retrieves all orders. Owner access is required.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Orders retrieved successfully",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Access denied",
      },
    },
  },
},

"/api/v1/orders/my": {
  get: {
    tags: ["Order"],
    summary: "Get my orders",
    description: "Retrieves orders belonging to the authenticated customer.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Orders retrieved successfully",
      },
      "401": {
        description: "Authentication required",
      },
    },
  },
},

"/api/v1/orders/{id}/status": {
  patch: {
    tags: ["Order"],
    summary: "Update order status",
    description: "Updates the status of an order. Owner access is required.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Order ID",
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdateOrderStatusRequest",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Order status updated successfully",
      },
      "400": {
        description: "Invalid order status",
      },
      "401": {
        description: "Authentication required",
      },
      "403": {
        description: "Access denied",
      },
      "404": {
        description: "Order not found",
      },
    },
  },
},

}};

/*export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};*/

export const setupSwagger = (app: Express) => {
  app.get("/swagger-json", (req, res) => {
    res.json(swaggerDocument);
  });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};