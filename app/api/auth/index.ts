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
  ResetOtpRequest,
  ResetOtpSuccessResponse,
  ResetPasswordRequest,
  ResetPasswordSuccessResponse,
  VerifyEmailRequest,
  VerifyEmailSuccessResponse,
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

  verifyEmail: (payload: VerifyEmailRequest) => {
    return apiClient
      .get<VerifyEmailSuccessResponse>(
        `/auth/verify-email?query=${payload.token}`
      )
      .then((res) => res.data);
  },

  resetPassword: (payload: ResetPasswordRequest) =>
    apiClient.post<ResetPasswordSuccessResponse>(
      `/auth/forgot-password`,
      payload
    ),

  verifyRestOtp: (payload: ResetOtpRequest) =>
    apiClient.post<ResetOtpSuccessResponse>(`/auth/verify-reset-otp`, payload),

  // change password from profile

  changePassword: (payload: ChangePasswordRequest) =>
    apiClient.post<ChangePasswordSuccessResponse>(
      `/auth/forgot-password`,
      payload
    ),
};
