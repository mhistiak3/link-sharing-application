/**
 * Application constants
 */

// File upload constants
export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// Link constants
export const MAX_LINKS = 5;
export const MIN_PASSWORD_LENGTH = 8;

// Social media platforms
export const SOCIAL_PLATFORMS = {
  GITHUB: "GitHub",
  YOUTUBE: "YouTube",
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
};

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `Image size must be below ${MAX_FILE_SIZE_MB}MB`,
  INVALID_FILE_TYPE: "Only JPG, JPEG, and PNG formats are allowed",
  INVALID_URL: "Please enter valid URLs (e.g., https://example.com)",
  INVALID_PLATFORM_URL: "URL doesn't match the selected platform",
  PASSWORD_TOO_SHORT: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  EMPTY_FIELDS: "Please fill all fields before saving",
  MAX_LINKS_REACHED: `You can only add up to ${MAX_LINKS} links`,
  IMAGE_REQUIRED: "Profile image is required for new profiles",
};

// Success messages
export const SUCCESS_MESSAGES = {
  PROFILE_CREATED: "Profile created successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  LINKS_CREATED: "Links created successfully",
  LINKS_UPDATED: "Links updated successfully",
  LOGIN_SUCCESS: "Login successfully",
  REGISTER_SUCCESS: "Account created successfully",
  LINK_COPIED: "Link copied to clipboard",
};
