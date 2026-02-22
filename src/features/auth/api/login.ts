import { apiClient } from '../../../lib/api/axios'
import {
  loginPayloadSchema,
  loginResponseSchema,
} from '../schemas/auth.schema'
import type { LoginPayload, LoginResponse } from '../types/auth.types'

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const requestData = loginPayloadSchema.parse(payload)
  const response = await apiClient.post('/auth/login', requestData)
  return loginResponseSchema.parse(response.data)
}
