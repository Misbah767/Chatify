export const OTP_LENGTH = 6;

export const isOtpComplete = (otp: string[]) => {
  return otp.every((digit) => digit.trim() !== "");
};

export const isValidOtpPaste = (value: string) => {
  return new RegExp(`^\\d{${OTP_LENGTH}}$`).test(value);
};
