import { apiClient } from "../client";
import {
  ChangePasswordRequest,
  ChangePasswordSuccessResponse,
  ForgotPasswordRequest,
  ForgotPasswordSuccessResponse,
  LoginRequest,
  LoginSuccessResponse,
  RegisterRequest,
  RegisterSuccessResponse,
  ResetPasswordRequest,
  ResetPasswordSuccessResponse,
} from "./types";

export const authApi = {
  register: (payload: RegisterRequest) =>
    apiClient.post<RegisterSuccessResponse>(`/auth/register`, payload),

  Login: (payload: LoginRequest) =>
    apiClient.post<LoginSuccessResponse>(`/auth/login`, payload),

  forgotPassword: (payload: ForgotPasswordRequest) =>
    apiClient.post<ForgotPasswordSuccessResponse>(
      `/auth/forgot-password`,
      payload
    ),

  resetPassword: (payload: ResetPasswordRequest) =>
    apiClient.post<ResetPasswordSuccessResponse>(
      `/auth/forgot-password`,
      payload
    ),

  // change password from profile

  changePassword: (payload: ChangePasswordRequest) =>
    apiClient.post<ChangePasswordSuccessResponse>(
      `/auth/forgot-password`,
      payload
    ),
};
