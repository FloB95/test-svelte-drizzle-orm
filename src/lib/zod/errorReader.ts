import type { ZodError } from 'zod';

export const zodErrorBeautifier = (zodError: ZodError) => {
	const fieldErrors = zodError.flatten().fieldErrors;
	const formErrors = zodError.flatten().formErrors;
	const fieldErrorsArray = Object.entries(fieldErrors);
	const formErrorsArray = Object.entries(formErrors);
	const fieldErrorsString = fieldErrorsArray.map((fieldError) => {
		const [field, error] = fieldError;
		return `${field}: ${error}`;
	});
	const formErrorsString = formErrorsArray.map((formError) => {
		const [field, error] = formError;
		return `${field}: ${error}`;
	});
	const fieldErrorsStringJoined = fieldErrorsString.join(', ');
	const formErrorsStringJoined = formErrorsString.join(', ');
	const zodErrorString = `${fieldErrorsStringJoined && 'FieldErrors: \n ' + fieldErrorsStringJoined}${formErrorsStringJoined && '  \nFormErrors: ' + formErrorsStringJoined}`;
	return zodErrorString;
};
