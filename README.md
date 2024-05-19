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

  ### 4. Get Places by Tags

- **Endpoint:** `GET /tags/:tags`
- **Description:** Retrieves places associated with specific tags.
- **URL Params:** 
  - **Required:** `tags=[string]`
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `[See relevant place data]`
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "No places found with these tags" }`

### 5. Get Places by Type

- **Endpoint:** `GET /type/:type`
- **Description:** Retrieves places by their type (e.g., museum, park).
- **URL Params:** 
  - **Required:** `type=[string]`
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `[See relevant place data]`
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "No places found of this type" }`

### 6. Get Places by Operating Times

- **Endpoint:** `GET /time/:open/:close`
- **Description:** Retrieves places open between specific times.
- **URL Params:** 
  - **Required:** `open=[time], close=[time]`
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `[See relevant place data]`
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "No places found open during these hours" }`

### 7. Get Places by Open Days

- **Endpoint:** `GET /days/:days`
- **Description:** Retrieves places open on specific days of the week.
- **URL Params:** 
  - **Required:** `days=[string]` (e.g., Monday, Tuesday)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `[See relevant place data]`
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "No places found open on these days" }`

### 8. Search Places by Name

- **Endpoint:** `GET /search`
- **Description:** Performs a search for places based on a query string parameter `name`.
- **Query Params:** 
  - **Required:** `name=[string]`
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** `[See relevant place data]`
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "No places found matching this name" }`
