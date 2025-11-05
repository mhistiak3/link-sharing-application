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
 * Validates if URL matches the selected platform
 * @param {string} url - The URL to validate
 * @param {string} platform - The platform name (GitHub, YouTube, etc.)
 * @returns {object} - {isValid: boolean, message: string}
 */
export const validatePlatformURL = (url, platform) => {
  if (!url || !platform) {
    return { isValid: false, message: "URL and platform are required" };
  }

  const platformPatterns = {
    GitHub: {
      patterns: [/github\.com/i, /gist\.github\.com/i],
      message:
        "Please enter a valid GitHub URL (e.g., https://github.com/username)",
    },
    YouTube: {
      patterns: [/youtube\.com/i, /youtu\.be/i],
      message:
        "Please enter a valid YouTube URL (e.g., https://youtube.com/@channel)",
    },
    Facebook: {
      patterns: [/facebook\.com/i, /fb\.com/i, /fb\.me/i],
      message:
        "Please enter a valid Facebook URL (e.g., https://facebook.com/username)",
    },
    Instagram: {
      patterns: [/instagram\.com/i],
      message:
        "Please enter a valid Instagram URL (e.g., https://instagram.com/username)",
    },
    LinkedIn: {
      patterns: [/linkedin\.com/i],
      message:
        "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)",
    },
  };

  const platformConfig = platformPatterns[platform];
  if (!platformConfig) {
    return { isValid: true, message: "" }; // Unknown platform, allow any valid URL
  }

  const isValidForPlatform = platformConfig.patterns.some((pattern) =>
    pattern.test(url)
  );

  return {
    isValid: isValidForPlatform,
    message: isValidForPlatform ? "" : platformConfig.message,
  };
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
