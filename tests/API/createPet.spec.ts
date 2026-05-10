import { test, expect } from '../../fixtures';
import payload from '../../data/petStorePayload.json';

test('with required fields', async ({ petController }) => {
  const payload2 = {
    name: "Oscar",
    photoUrls: ["https://www.grandopet.hu/upload_files/filemanager/fajtaleiras/mopsz/mopsz%20k%C3%B6ly%C3%B6k%201.jpg"]
  };
  const response = await petController.createPet(payload2);
  
  expect(response.status()).toBe(200);
  const body = await response.json()
  expect(body).toMatchObject(payload2);
  expect(body.id).toBeGreaterThan(0);
});

test('with all fields', async ({ petController }) => {
  await petController.deletePet(payload.id);  // to make sure we won't just modify an existing pet
  const response = await petController.createPet(payload);

  expect(response.status()).toBe(200);
  const body = await response.json()
  expect(body).toMatchObject(payload);
});

test.fail('Invalid ID', {tag: '@invalidCreate'}, async ({ petController }) => {
  const response = await petController.createPet({"id": "string"});

  expect(response.status()).toBe(405);  // BUG: 500
  await petController.checkErrorMsgOfResponse(response, "Invalid input");  // BUG: "something bad happened"
});