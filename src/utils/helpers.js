/**
 * Utility functions for the Link Sharing Application
 */

/**
 * Validates if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validates file size
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validates file type for images
 * @param {File} file - The file to validate
 * @returns {boolean} - True if valid image type, false otherwise
 */
export const isValidImageType = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  return validTypes.includes(file.type);
};

/**
 * Sanitizes user input to prevent XSS
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
};

/**
 * Formats error messages for display
 * @param {Error|string} error - The error to format
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (typeof error === "string") return error;
  return error?.message || "An unexpected error occurred";
};
