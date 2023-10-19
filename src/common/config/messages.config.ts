export const successMessage = {
  USER_FETCHED: 'Users fetched successfully',
  USER_CREATED: 'User created successfully',
};

export const errorMessages = {
  UNEXPECTED_ERROR: 'Unexpected Error',
  REQUIRED_FIELD: '#field is required',
  DUPLICATE_DATA: '#field already exist',
  INVALID_EMAIL: 'Email is invalid',
};

export const replaceFieldInMessage = (
  field: string,
  message: string,
): string => {
  return message.replace('#field', field);
};
