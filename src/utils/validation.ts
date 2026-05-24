/**
 * Form validation and input validation utilities
 */

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function getFormData(form: HTMLFormElement): Record<string, FormDataEntryValue> {
  const data = new FormData(form);
  const result: Record<string, FormDataEntryValue> = {};
  
  data.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

export function validateFormData(
  data: Record<string, FormDataEntryValue>,
  rules: Record<string, ((value: FormDataEntryValue) => boolean)[]>
): { valid: boolean; errors: Record<string, string[]> } {
  const errors: Record<string, string[]> = {};

  Object.entries(rules).forEach(([field, validators]) => {
    const value = data[field];
    const fieldErrors: string[] = [];

    validators.forEach((validator) => {
      if (!validator(value)) {
        // Generate error message based on validator function
        if (validator.name === 'isValidEmail') {
          fieldErrors.push('Please enter a valid email address');
        } else if (validator.name === 'isRequired') {
          fieldErrors.push('This field is required');
        }
      }
    });

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
