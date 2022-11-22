let usernameRegex = /^[a-zA-Z0-9]+$/;
export function usernameValidator (username) { return usernameRegex.test(username);}