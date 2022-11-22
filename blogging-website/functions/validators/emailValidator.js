let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

export function emailValidator(email) { return regex.test(email);}
