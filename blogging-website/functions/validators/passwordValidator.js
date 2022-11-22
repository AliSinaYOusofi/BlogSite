let re = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/; // min 8 at least one capital one number
export function passwordValidator(password) { return re.test(password);}