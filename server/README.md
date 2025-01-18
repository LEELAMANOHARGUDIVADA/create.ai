# API Documentation

## Overview

This document provides an overview of the API routes, models, and controllers used in this project.

## Routes

### User Routes

- **File:** [server/routes/UserRoutes.js](server/routes/UserRoutes.js)
- **Controller:** [server/controllers/UserController.js](server/controllers/UserController.js)

| Route          | Method | Description                   |
| -------------- | ------ | ----------------------------- |
| `/register`    | POST   | Register a new user           |
| `/verifyOtp`   | POST   | Verify OTP for user registration |

### AI Routes

- **File:** [server/routes/AiRoutes.js](server/routes/AiRoutes.js)
- **Controller:** [server/controllers/AIController.js](server/controllers/AIController.js)

| Route              | Method | Description                   |
| ------------------ | ------ | ----------------------------- |
| `/generateText`    | POST   | Generate text using AI        |
| `/generateImage`   | POST   | Generate image using AI       |

### Chat Routes

- **File:** [server/routes/chatRoutes.js](server/routes/chatRoutes.js)
- **Controller:** [server/controllers/ChatController.js](server/controllers/ChatController.js)

| Route                    | Method | Description                   |
| ------------------------ | ------ | ----------------------------- |
| `/addMessage`            | POST   | Add a new chat message        |
| `/ChatHistory/:chatId`   | GET    | Get chat history by chat ID   |

## Models

### User Model

- **File:** [server/models/UserSchema.js](server/models/UserSchema.js)

| Field        | Type    | Description                   |
| ------------ | ------- | ----------------------------- |
| phoneNumber  | String  | User's phone number           |
| fullName     | String  | User's full name              |
| isVerified   | Boolean | User's verification status    |

### Chat Model

- **File:** [server/models/ChatSchema.js](server/models/ChatSchema.js)

| Field    | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| chatId   | String | ID of the chat                |
| sender   | String | Sender of the message         |
| text     | String | Text of the message           |

## Controllers

### User Controller

- **File:** [server/controllers/UserController.js](server/controllers/UserController.js)

| Function      | Description                                           |
| ------------- | ----------------------------------------------------- |
| `register`    | Registers a new user and sends OTP for verification   |
| `verifyOtp`   | Verifies the OTP sent to the user's phone number      |

### AI Controller

- **File:** [server/controllers/AIController.js](server/controllers/AIController.js)

| Function          | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `generateText`    | Generates text based on the provided prompt           |
| `generateImage`   | Generates an image based on the provided prompt       |

### Chat Controller

- **File:** [server/controllers/ChatController.js](server/controllers/ChatController.js)

| Function          | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `addMessage`      | Adds a new message to the chat                        |
| `getChatHistory`  | Retrieves the chat history for a given chat ID        |

## AI Integrations

### Gemini AI

- **File:** [server/ai-integrations/gemini.js](server/ai-integrations/gemini.js)
- **Description:** Integrates with Google Generative AI for text generation.

### Image Generation

- **File:** [server/ai-integrations/image.generation.js](server/ai-integrations/image.generation.js)
- **Description:** Integrates with Monster API for image generation.

## Utilities

### JWT Utility

- **File:** [server/utils/jwt.js](server/utils/jwt.js)
- **Description:** Generates JWT tokens for user authentication.

## Database

### MongoDB Connection

- **File:** [server/db.js](server/db.js)
- **Description:** Connects to the MongoDB database using Mongoose.

## Environment Variables

- **File:** [server/.env](server/.env)
- **Description:** Contains environment variables for the project.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```
