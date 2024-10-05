## Microservices Architecture Project
This repository contains three microservices: User Service, Product Service, and Order Service. The services interact through Kafka for messaging and use MongoDB for data storage.

# Features
User management, product management, and order processing services.
Event-driven communication via Kafka for real-time data streaming.
MongoDB as the database for all services.
Express.js for handling RESTful API routes.

# Technologies Used
Node.js
Express.js
MongoDB
Kafka
Docker (for running MongoDB/Kafka)

# Overview
1. User Service
Handles user registration, login, and authentication.

2. Product Service
Manages product creation, listing, and updates by sellers.

3. Order Service
Processes orders, updates order status, and tracks user purchases.

# Prerequisites
Node.js (v14.x or higher)
MongoDB (Running locally or via Docker)
Kafka (Running locally or via Docker)
Docker (For containerization)
Postman or cURL for testing the services

# Installation
1. Clone the Repository:
git clone https://github.com/Ridhi1001/pratilipi-assignment.git
2. Install Dependencies for all microservices:
npm install
3. Configuration
Each service connects to its own database or uses a shared database. The default MongoDB connection string is mongodb://127.0.0.1:27017/.
Update the connection strings in the respective service configuration files.
Ensure Kafka is running and accessible via localhost:9092. Modify the Kafka settings if needed.

# Running the Application
1. Start MongoDB:
If MongoDB is installed locally:
mongod
2. Start Kafka:
Use Docker Compose for Kafka and ZooKeeper:
docker-compose up
3. Start Microservices:
npm start

# Microservice Ports:
User Service: http://127.0.0.1:3001/
Product Service: http://127.0.0.1:3002/
Order Service: http://127.0.0.1:3003/

# API Endpoints
1. User Service
POST /register
POST /login

2. Product Service
POST /create
POST /update-inventory

3. Order Service
POST /place-order
GET /:userId/orders
