# API Endpoint Documentation

This document outlines the usage of the API endpoints for the Places service. These endpoints allow clients to query place data stored in our database.

## Endpoints

### 1. Get All Places

- **Endpoint:** `GET /getAll`

- **Description:** Retrieves all places from the database.

- **URL Params:** None

- **Data Params:** None

- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    [
      { "id": 12, "name": "Central Park", "borough": "Manhattan" },
     { "id": 34, "name": "Zilker Park", "borough": "Austin" }
    ]
    ```

- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Places not found" }`


### 2. Get Place by ID

- **Endpoint:** `GET /:id`

- **Description:** Retrieves a place based on a unique ID.

- **URL Params:** 
- **Required:** `id=[integer]`

- **Data Params:** None

- **Success Response:**
- **Code:** 200
- **Content:**
  ```json
  {
    "id": 12,
    "name": "Central Park",
    "borough": "Manhattan"
  }
  ```

- **Error Response:**
- **Code:** 404 NOT FOUND
- **Content:** `{ "error": "Place not found" }`

### 3. Get Places by Boroughs
- **Endpoint:** `GET /borough/:borough`

- **Description:** Retrieves a place based on the borough

- **URL Params:** 
- **Required:** `id=[string]`

- **Data Params:** None

- **Success Response:**
- **Code:** 200
- **Content:**
  ```json
  {
    { "id": 12, "name": "Central Park", "borough": "Manhattan" },
  { "id": 34, "name": "Prospect Park", "borough": "Brooklyn" }
  }
  ```

- **Error Response:**
- **Code:** 404 NOT FOUND
- **Content:** `{ "error": "No Places found in this borough }`
