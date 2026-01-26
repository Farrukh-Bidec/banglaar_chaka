/**
 * Extracts error message from various error formats
 * Handles different error structures:
 * 1. Axios errors (error.response.data.message)
 * 2. API response errors (error.data.message)
 * 3. Standard error objects (error.message)
 * 4. Custom error formats
 * 
 * @param {object} error - The error object
 * @param {string} fallback - Fallback message if no error message found
 * @returns {string} - The extracted error message
 */
export function extractErrorMessage(error, fallback = "An error occurred") {
  // If error is already a string, return it
  if (typeof error === "string") {
    return error;
  }

  // Check various error message locations in order of priority
  return (
    error?.response?.data?.message || // Axios error with response
    error?.message || // Standard error message
    error?.data?.message || // API response structure
    error?.data?.error || // Alternative API error field
    error?.error || // General error field
    fallback
  );
}

/**
 * Extracts additional error data from error object
 * Useful for getting fields like email, validation errors, etc.
 * 
 * @param {object} error - The error object
 * @returns {object} - The extracted error data
 */
export function extractErrorData(error) {
  return error?.response?.data || error?.data || {};
}

