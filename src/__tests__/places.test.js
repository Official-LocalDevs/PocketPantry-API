const placeController = require("../controllers/placeController");
const Places = require("../models/Place");

jest.mock("../models/Place");

const response = {
  status: jest.fn().mockReturnThis(), // Allows chaining
  json: jest.fn(), // Mock json method
  send: jest.fn(), // Mock send method
};

const mockData = [
  {
    _id: "64d9312fe5a2b6f9a7c7d1e8",
    name: "Place 1",
    tags: ["HIV Customers"],
    hours: {
      food_pantry: {
        Tuesday: [
          {
            open: "10:00",
            close: "12:00",
          },
        ],
      },
    },
    borough: "Queens",
  },
  {
    _id: "64d9312fe5a2b6f9a7c7d1e9",
    name: "Place 2",
    tags: ["Kosher", "Halal"],
    hours: {
      food_pantry: {
        Sunday: [
          {
            open: "07:30",
            close: "09:30",
          },
        ],
      },
    },
    borough: "Queens",
  },
  {
    _id: "64d9312fe5a2b6f9a7c7d1ea",
    name: "Place 3",
    tags: ["Halal"],
    hours: {
      food_pantry: {
        Wednesday: [
          {
            open: "15:00",
            close: "16:00",
          },
        ],
      },
    },
    borough: "Brooklyn",
  },
  {
    _id: "64d9312fe5a2b6f9a7c7d1eb",
    name: "Place 4",
    tags: [],
    hours: {
      soup_kitchen: {
        Friday: [
          {
            open: "12:30",
            close: "14:00",
          },
        ],
      },
    },
    borough: "Manhattan",
  },
  {
    _id: "64d9312fe5a2b6f9a7c7d1ec",
    name: "Area 51",
    tags: [],
    hours: {
      food_pantry: {
        Tuesday: [
          {
            open: "12:30",
            close: "15:00",
          },
        ],
      },
      soup_kitchen: {
        Tuesday: [
          {
            open: "12:30",
            close: "14:30",
          },
        ],
        Thursday: [
          {
            open: "17:00",
            close: "19:00",
          },
        ],
      },
    },
  },
];

it("should get all places", async () => {
  // Mock the Places.find method to return the mock data
  Places.find.mockResolvedValue(mockData);

  // Call the getPlaces controller method
  await placeController.getPlaces({}, response);

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(mockData);

  // Check the length of the returned array
  expect(response.json.mock.calls[0][0].length).toBe(5);
});

it("should get place by id", async () => {
  // Mock the Places.findById method to return a single item from mockData
  const placeId = "64d9312fe5a2b6f9a7c7d1ea"; // Use the actual ID from mockData for a realistic test
  const place = mockData.find((item) => item._id === placeId); // Find the item with the specified ID
  Places.findById.mockResolvedValue(place);

  // Call the getPlaceById controller method
  await placeController.getPlaceById({ params: { id: placeId } }, response);

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(place);

  // Check that exactly one value was returned
  expect(response.json.mock.calls[0][0]).toEqual(place);
  expect(Array.isArray(response.json.mock.calls[0][0])).toBe(false); // Ensure the response is not an array
});

it("should throw error if place by id not found", async () => {
  // Mock the Places.findById method to return null value
  Places.findById.mockResolvedValue(null);

  // Call the getPlaceById controller method
  await placeController.getPlaceById(
    { params: { id: "64d9324fe5a2b6f9a7c7d1ed" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.json).toHaveBeenCalledWith({ message: "Place not found" });
});

it("should throw error if invalid id format is provided", async () => {
  // Call the getPlaceById controller method
  await placeController.getPlaceById(
    { params: { id: "invalid-id" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.json).toHaveBeenCalledWith({ message: "Invalid ID format" });
});

it("should get places by borough", async () => {
  // Filter the places to match the borough
  const filteredPlaces = mockData.filter(
    (place) => place.borough === "Manhattan"
  );

  // Mock the Places.find method to return the mock data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the getPlacesByBorough controller method
  await placeController.getPlacesByBorough(
    { params: { borough: "Manhattan" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);

  // Check the length of the returned array
  expect(filteredPlaces.length).toBe(1);
});

it("should throw an error if place by borough not found", async () => {
  // Mock the Places.find method to return an empty array
  Places.find.mockResolvedValue([]);

  // Call the getPlacesByBorough controller method with a borough that is not in the mock data
  await placeController.getPlacesByBorough(
    { params: { borough: "NonexistentBorough" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.json).toHaveBeenCalledWith({ message: "Places not found" });
});

it("should get places by tag", async () => {
  // Filter the places to match the tag
  const filteredPlaces = mockData.filter((place) =>
    place.tags.includes("Halal")
  );

  // Mock the Places.find method to return the mock data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the getPlacesByTag controller method
  await placeController.getPlaceByTag({ params: { tags: "Halal" } }, response);

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);

  // Check the length of the returned array
  expect(filteredPlaces.length).toBe(2);
});

it("should throw an error if place by tag not found", async () => {
  // Mock the Places.find method to return an empty array
  Places.find.mockResolvedValue([]);

  // Call the getPlaceByTag controller method with a tag that is not in the mock data
  await placeController.getPlaceByTag(
    { params: { tags: "NonexistentTag" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(404); // Assuming 404 for "not found"
  expect(response.json).toHaveBeenCalledWith({ message: "Places not found" });
});

it("should get places with food_pantry", async () => {
  // Filter the mock data to return places with food_pantry
  const filteredPlaces = mockData.filter((place) => place.hours.food_pantry);

  // Mock the Places.find method to return the filtered data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the controller method
  await placeController.getPlaceByType(
    { params: { type: "food_pantry" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);
  expect(filteredPlaces.length).toBeGreaterThan(0); // Ensure some places have food_pantry
});

it("should get places with soup_kitchen", async () => {
  // Filter the mock data to return places with soup_kitchen
  const filteredPlaces = mockData.filter((place) => place.hours.soup_kitchen);

  // Mock the Places.find method to return the filtered data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the controller method
  await placeController.getPlaceByType(
    { params: { type: "soup_kitchen" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);
  expect(filteredPlaces.length).toBeGreaterThan(0); // Ensure some places have soup_kitchen
});

it("should throw an error if place by type not found", async () => {
  // Mock the Places.find method to return an empty array
  Places.find.mockResolvedValue([]);

  // Call the getPlaceByType controller method with a type that is not in the mock data
  await placeController.getPlaceByType(
    { params: { type: "NonexistentType" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.json).toHaveBeenCalledWith({ message: "Places not found" });
});

it("should get places by one day", async () => {
  // Filter the places to match the days
  const filteredPlaces = mockData.filter(
    (place) =>
      (place.hours.food_pantry && place.hours.food_pantry.Tuesday) ||
      (place.hours.soup_kitchen && place.hours.soup_kitchen.Tuesday)
  );

  // Mock the Places.find method to return the filtered data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the getPlacesByDays controller method
  await placeController.getPlaceByDays(
    { params: { days: "Tuesday" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);
  expect(filteredPlaces.length).toBe(2);
});

it("should throw an error if place by days not found", async () => {
  // Mock the Places.find method to return an empty array
  Places.find.mockResolvedValue([]);

  // Call the getPlacesByDays controller method
  await placeController.getPlaceByDays(
    { params: { days: "NonexistentDay" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.json).toHaveBeenCalledWith({ message: "Places not found" });
});

it("should get places by open and close time", async () => {
  // Define the open and close times for filtering
  const openTime = "12:00";
  const closeTime = "15:00";

  // Helper function to check if a place is open during the specified time range
  const isOpenDuringRange = (hours, openTime, closeTime) => {
    // Check food pantry hours
    const foodPantryHours = hours.food_pantry || {};
    const soupKitchenHours = hours.soup_kitchen || {};

    // Check food pantry hours
    const foodPantryOpen = Object.keys(foodPantryHours).some((day) =>
      foodPantryHours[day].some(
        (slot) => slot.open < closeTime && slot.close > openTime
      )
    );

    // Check soup kitchen hours
    const soupKitchenOpen = Object.keys(soupKitchenHours).some((day) =>
      soupKitchenHours[day].some(
        (slot) => slot.open < closeTime && slot.close > openTime
      )
    );

    return foodPantryOpen || soupKitchenOpen;
  };

  // Filter the places based on the time range
  const filteredPlaces = mockData.filter((place) =>
    isOpenDuringRange(place.hours, openTime, closeTime)
  );

  // Mock the Place.find method to return the filtered data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the getPlaceByTime controller method
  await placeController.getPlaceByTime(
    { params: { open: openTime, close: closeTime } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);
  expect(filteredPlaces.length).toBe(2); // Adjust based on your filtered result
});

it("should get places by multiple days", async () => {
  // Split the days parameter and filter the places to match any of the specified days
  const days = ["Tuesday", "Wednesday"];
  const filteredPlaces = mockData.filter((place) => {
    // Check if any of the specified days are present in food_pantry or soup_kitchen
    return (
      (place.hours.food_pantry &&
        days.some((day) => place.hours.food_pantry[day])) ||
      (place.hours.soup_kitchen &&
        days.some((day) => place.hours.soup_kitchen[day]))
    );
  });

  // Mock the Places.find method to return the filtered data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the getPlacesByDays controller method
  await placeController.getPlaceByDays(
    { params: { days: "Tuesday,Wednesday" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);
  expect(filteredPlaces.length).toBe(3);
});

it("should get places by name", async () => {
  // Filter the places to match the name
  const filteredPlaces = mockData.filter((place) =>
    place.name.includes("Place")
  );

  // Mock the Places.find method to return the mock data
  Places.find.mockResolvedValue(filteredPlaces);

  // Call the getPlacesByName controller method
  await placeController.getPlaceByName({ query: { name: "Place" } }, response);

  // Assertions
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith(filteredPlaces);

  // Check the length of the returned array
  expect(filteredPlaces.length).toBe(4);
});

it("should throw an error if place by name not found", async () => {
  // Mock the Places.find method to return an empty array
  Places.find.mockResolvedValue([]);

  // Call the getPlacesByName controller method
  await placeController.getPlaceByName(
    { query: { name: "NonexistentName" } },
    response
  );

  // Assertions
  expect(response.status).toHaveBeenCalledWith(404);
  expect(response.json).toHaveBeenCalledWith({ message: "Places not found" });
});
