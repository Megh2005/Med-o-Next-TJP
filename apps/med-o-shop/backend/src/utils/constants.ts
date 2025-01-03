const MONGO_DB_NAME = "test";
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const PAGINATION_OFFSET = 10;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export { MONGO_DB_NAME, PASSWORD_REGEX, PAGINATION_OFFSET, PINCODE_REGEX };
