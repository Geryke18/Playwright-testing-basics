import { APIResponse, type APIRequestContext } from '@playwright/test';
import { expect } from '@playwright/test';

export class PetController {
  constructor(private request: APIRequestContext) {}

  async createPet(data: object): Promise<APIResponse> {
    return await this.request.post('pet', { data });
  }

  async getPet(id: number | string | bigint): Promise<APIResponse> {
    return await this.request.get(`pet/${id}`);
  }

  async deletePet(id: number): Promise<APIResponse> {
    return await this.request.delete(`pet/${id}`);
  }

  async checkErrorMsgOfResponse(response: APIResponse, message: string) {
    const body = await response.json().catch(() => ({}));
    expect(body.message).toBe(message);
  }

}