import { ApiResponse } from '@shared/types';

export function successResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
  return { code: 200, message, data, timestamp: Date.now() };
}

export function errorResponse(code: number, message: string): ApiResponse<null> {
  return { code, message, data: null, timestamp: Date.now() };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
