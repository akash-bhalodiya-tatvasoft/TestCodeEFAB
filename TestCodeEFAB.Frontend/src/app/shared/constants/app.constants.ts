export const APP_CONSTANTS = {
    KEYS:{
        TOKEN:'token',
        TOKEN_SCHEMA:'Bearer '
    }
}

export const HTTP_ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const HTTP_ERROR_MESSAGES = {
  DEFAULT: 'An unexpected error occurred',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  INTERNAL_SERVER_ERROR: 'Internal server error.'
};

export const LOG_TAGS = {
  HTTP_ERROR: '[HTTP ERROR]'
} as const;