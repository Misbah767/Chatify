export const OTP_LENGTH = 6;

export type OtpValue = string[];

export interface OtpValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate OTP input array
 * Can be used for account verification or reset OTP
 */
export const validateOtp = (otp: OtpValue): OtpValidationResult => {
  if (!otp || otp.length !== OTP_LENGTH) {
    return { isValid: false, error: `OTP must be ${OTP_LENGTH} digits` };
  }

  if (otp.some((digit) => digit.trim() === "")) {
    return { isValid: false, error: "All OTP fields are required" };
  }

  if (!otp.every((d) => /^\d$/.test(d))) {
    return { isValid: false, error: "OTP must contain only digits" };
  }

  return { isValid: true };
};
