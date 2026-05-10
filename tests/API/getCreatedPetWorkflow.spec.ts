import { test, expect } from '../../fixtures';
import payload from '../../data/petStorePayload.json';

payload.id = Date.now();  // to avoid Race Condition in paralel test run

test('create and get pet', async ({ petController }) => {
  await petController.deletePet(payload.id);  // to make sure we won't just modify an existing pet
  const response = await petController.createPet(payload);
  expect(response.ok()).toBeTruthy();
  const body = await response.json()
  const newPetID = body.id;

  const response2 = await petController.getPet(newPetID);

  expect(response2.ok()).toBeTruthy();
  const body2 = await response2.json()
  expect(body2).toMatchObject(payload);
});