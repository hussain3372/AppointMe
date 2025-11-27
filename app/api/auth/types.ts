// Register types

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
}

export interface RegisterSuccessResponse {
  error: {
    message: string,
  }
  message: string;
  user: {
    id: string;
    tenantId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    profile: string;
    createdAt: string;
    updatedAt: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// login types

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  error: {
    message: string,
  }
  message: string;
  user: {
    id: string;
    tenantId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    profile: string;
    createdAt: string;
    updatedAt: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// forgot password

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordSuccessResponse {
  message: string;
}

// reset password

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordSuccessResponse {
  message: string;
}


// change password

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordSuccessResponse {
  message: string;
}
