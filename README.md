
![PocketPantry API by LocalDevs-3](https://github.com/Official-LocalDevs/FeedNYC-API/assets/160681835/a5b78d1e-8cf7-4f0d-aafb-a7bcd3179bff)



🎉🎉🎉 Our API Documentation is on Apiary! Check it out [here](https://thepocketpantry.docs.apiary.io/#)! 🎉🎉🎉


This document outlines the usage of the Pocket Pantry API. Pocket Pantry is a project by Local Devs that aims to centralize information about food assistance programs in New York City. 

👉 Check out & Star the project on [Github](https://github.com/Official-LocalDevs/FeedNYC-API/tree/main)!

👉 Learn more about [LocalDevs](localdevs.city) and follow us on [LinkedIn](https://www.linkedin.com/company/localdevs)!


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
     {
    "_id": "660a91248747cd35103e54ba",
    "name": "Al Hajjah Fajr Tyson Halal Food and Clothing Distribution Pantry",
    "address": "2269 Crotona Ave, Bronx, NY, 10457",
    "contact": "(646) 353-0859",
    "tags": [
      "Halal"
    ],
    "hours": {
      "food_pantry": {
        "Monday": [
          {
            "_id": "664d493a8d28da79ee488277",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Tuesday": [
          {
            "_id": "664d493a8d28da79ee488278",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Wednesday": [
          {
            "_id": "664d493a8d28da79ee488279",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Thursday": [
          {
            "_id": "664d493a8d28da79ee48827a",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Friday": [
          {
            "_id": "664d493a8d28da79ee48827b",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Saturday": [
          {
            "_id": "664d493a8d28da79ee48827c",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Sunday": [
          {
            "_id": "664d493a8d28da79ee48827d",
            "open": "13:00",
            "close": "17:00"
          }
        ]
      },
      "_id": "664d493a8d28da79ee48827e"
    },
    "borough": "Bronx",
    "notes": []
    },
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
  "tags": [],
  "_id": "660a91248747cd35103e54be",
  "name": "Calvary Delivery Christian Assembly",
  "address": "737-739 Concourse Village West Bronx, NY, 10451",
  "contact": "(347) 658-4459",
  "notes": [
    {
      "_id": "664d47d88d28da79ee488198",
      "for": "All",
      "note": "Once a month, please call for date"
    }
  ],
  "borough": "Bronx"
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
      "_id": "660a91248747cd35103e54ba",
      "name": "Al Hajjah Fajr Tyson Halal Food and Clothing Distribution Pantry",
      "address": "2269 Crotona Ave, Bronx, NY, 10457",
      "contact": "(646) 353-0859",
      "tags": [
        "Halal"
      ],
      "hours": {
        "food_pantry": {
          "Monday": [
            {
              "_id": "664d3fd55163ad574f6d9bd4",
              "open": "13:00",
              "close": "17:00"
            }
          ],
          "Tuesday": [
            {
              "_id": "664d3fd55163ad574f6d9bd5",
              "open": "13:00",
              "close": "17:00"
            }
          ],
          "Wednesday": [
            {
              "_id": "664d3fd55163ad574f6d9bd6",
              "open": "13:00",
              "close": "17:00"
            }
          ],
          "Thursday": [
            {
              "_id": "664d3fd55163ad574f6d9bd7",
              "open": "13:00",
              "close": "17:00"
            }
          ],
          "Friday": [
            {
              "_id": "664d3fd55163ad574f6d9bd8",
              "open": "13:00",
              "close": "17:00"
            }
          ],
          "Saturday": [
            {
              "_id": "664d3fd55163ad574f6d9bd9",
              "open": "13:00",
              "close": "17:00"
            }
          ],
          "Sunday": [
            {
              "_id": "664d3fd55163ad574f6d9bda",
              "open": "13:00",
              "close": "17:00"
            }
          ]
        },
        "_id": "664d3fd55163ad574f6d9bdb"
      },
      "borough": "Bronx",
      "notes": []
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
  - **Content:** `[ {
    "_id": "660a91248747cd35103e54ba",
    "name": "Al Hajjah Fajr Tyson Halal Food and Clothing Distribution Pantry",
    "address": "2269 Crotona Ave, Bronx, NY, 10457",
    "contact": "(646) 353-0859",
    "tags": [
      "Halal"
    ],
    "hours": {
      "food_pantry": {
        "Monday": [
          {
            "_id": "664d47768d28da79ee488085",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Tuesday": [
          {
            "_id": "664d47768d28da79ee488086",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Wednesday": [
          {
            "_id": "664d47768d28da79ee488087",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Thursday": [
          {
            "_id": "664d47768d28da79ee488088",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Friday": [
          {
            "_id": "664d47768d28da79ee488089",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Saturday": [
          {
            "_id": "664d47768d28da79ee48808a",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Sunday": [
          {
            "_id": "664d47768d28da79ee48808b",
            "open": "13:00",
            "close": "17:00"
          }
        ]
      },
      "_id": "664d47768d28da79ee48808c"
    },
    "borough": "Bronx",
    "notes": []
  },
]`
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
  - **Content:** `[{
    "tags": [],
    "_id": "660a91248747cd35103e54c3",
    "name": "WHEDCO - Women's Housing And Economico Development Corp.",
    "address": "50 East 168th Street, Bronx, NY, 10452",
    "contact": "(718) 839-1100",
    "hours": {
      "food_pantry": {
        "Monday": [
          {
            "_id": "664d47b38d28da79ee488137",
            "open": "14:30",
            "close": "16:00"
          }
        ],
        "Wednesday": [
          {
            "_id": "664d47b38d28da79ee488138",
            "open": "14:30",
            "close": "16:00"
          }
        ]
      },
      "_id": "664d47b38d28da79ee488139"
    },
    "borough": "Bronx",
    "notes": []
  },
]`
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
  - **Content:** `[{
    "_id": "660a91248747cd35103e54ba",
    "name": "Al Hajjah Fajr Tyson Halal Food and Clothing Distribution Pantry",
    "address": "2269 Crotona Ave, Bronx, NY, 10457",
    "contact": "(646) 353-0859",
    "tags": [
      "Halal"
    ],
    "hours": {
      "food_pantry": {
        "Monday": [
          {
            "_id": "664d41c25163ad574f6d9d19",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Tuesday": [
          {
            "_id": "664d41c25163ad574f6d9d1a",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Wednesday": [
          {
            "_id": "664d41c25163ad574f6d9d1b",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Thursday": [
          {
            "_id": "664d41c25163ad574f6d9d1c",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Friday": [
          {
            "_id": "664d41c25163ad574f6d9d1d",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Saturday": [
          {
            "_id": "664d41c25163ad574f6d9d1e",
            "open": "13:00",
            "close": "17:00"
          }
        ],
        "Sunday": [
          {
            "_id": "664d41c25163ad574f6d9d1f",
            "open": "13:00",
            "close": "17:00"
          }
        ]
      },
      "_id": "664d41c25163ad574f6d9d20"
    },
    "borough": "Bronx",
    "notes": []
  },
]`
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
  - **Content:** `[{
    "tags": [],
    "_id": "660a91248747cd35103e54bb",
    "name": "Caldwell Temple AME Zion Church Soup Kitchen",
    "address": "1288 Reverend James A. Polite Ave, Bronx, NY, 10459",
    "contact": "(718) 542-2933",
    "hours": {
      "soup_kitchen": {
        "Saturday": [
          {
            "_id": "664d48208d28da79ee488272",
            "open": "11:00",
            "close": "14:00"
          }
        ]
      },
      "_id": "664d48208d28da79ee488273"
    },
    "notes": [
      {
        "_id": "664d48208d28da79ee488274",
        "for": "Soup Kitchen",
        "note": "Every 2nd Saturday"
      }
    ],
    "borough": "Bronx"
  },
  {
    "tags": [],
    "_id": "660a91248747cd35103e54be",
    "name": "Calvary Delivery Christian Assembly",
    "address": "737-739 Concourse Village West Bronx, NY, 10451",
    "contact": "(347) 658-4459",
    "notes": [
      {
        "_id": "664d48208d28da79ee488275",
        "for": "All",
        "note": "Once a month, please call for date"
      }
    ],
    "borough": "Bronx"
  }
]`
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "No places found matching this name" }`
