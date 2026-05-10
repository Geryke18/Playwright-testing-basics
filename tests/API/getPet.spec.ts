import { test, expect } from '../../fixtures';
import payload from '../../data/petStorePayload.json';

payload.id = Date.now();  // to avoid Race Condition in paralel test run

test('get pet by existing ID', async ({ petController }) => {
  await petController.createPet(payload); // create the pet to make sure it exists
  const response = await petController.getPet(payload.id);

  expect(response.status()).toBe(200);
  const body = await response.json()
  expect(body).toMatchObject(payload);
});

test('Invalid ID format', {tag: '@invalidGet'}, async ({ petController }) => {
  const response = await petController.getPet("notAnInteger");

  expect(response.status()).toBe(404);
  await petController.checkErrorMsgOfResponse(response, "java.lang.NumberFormatException: For input string: \"notAnInteger\"");
});

test('ID out of bounds', {tag: '@invalidGet'}, async ({ petController }) => {
  const response = await petController.getPet(34532199999999999999n);

  expect(response.status()).toBe(404);
  await petController.checkErrorMsgOfResponse(response, "java.lang.NumberFormatException: For input string: \"34532199999999999999\"");
});