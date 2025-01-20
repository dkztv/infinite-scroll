/**
 * Type representing a user object fetched from the API.
 * @typedef {object} User
 * @property {string} gender - The gender of the user.
 * @property {object} name - The name of the user.
 * @property {string} name.title - The title of the user (e.g., Mr, Ms).
 * @property {string} name.first - The first name of the user.
 * @property {string} name.last - The last name of the user.
 * @property {object} location - The location details of the user.
 * @property {object} location.street - Street details.
 * @property {number} location.street.number - Street number.
 * @property {string} location.street.name - Street name.
 * @property {string} location.city - City name.
 * @property {string} location.state - State name.
 * @property {string} location.country - Country name.
 * @property {string|number} location.postcode - Postal code.
 * @property {object} location.coordinates - Geographic coordinates.
 * @property {string} location.coordinates.latitude - Latitude.
 * @property {string} location.coordinates.longitude - Longitude.
 * @property {object} location.timezone - Timezone information.
 * @property {string} location.timezone.offset - Timezone offset (e.g., +4:00).
 * @property {string} location.timezone.description - Timezone description.
 * @property {string} email - The user's email address.
 * @property {object} login - Login information for the user.
 * @property {string} login.uuid - Unique identifier for the user.
 * @property {string} login.username - The user's username.
 * @property {string} login.password - The user's password (hashed).
 * @property {string} login.salt - Salt used for password hashing.
 * @property {string} login.md5 - MD5 hash of the password.
 * @property {string} login.sha1 - SHA1 hash of the password.
 * @property {string} login.sha256 - SHA256 hash of the password.
 * @property {object} dob - The user's date of birth.
 * @property {string} dob.date - Date of birth in ISO format.
 * @property {number} dob.age - The user's age.
 * @property {object} registered - The user's registration details.
 * @property {string} registered.date - Registration date in ISO format.
 * @property {number} registered.age - Years since registration.
 * @property {string} phone - The user's phone number.
 * @property {string} cell - The user's cell phone number.
 * @property {object} id - Identification details for the user.
 * @property {string} id.name - The type of ID (e.g., SSN, UUID).
 * @property {string|null} id.value - The value of the ID (nullable).
 * @property {object} picture - URLs to the user's pictures.
 * @property {string} picture.large - Large-sized picture URL.
 * @property {string} picture.medium - Medium-sized picture URL.
 * @property {string} picture.thumbnail - Thumbnail picture URL.
 * @property {string} nat - Nationality of the user (e.g., US, DE).
 */
export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

/**
 * Type representing the response from the random user API.
 * @typedef {object} RandomUserApiResponse
 * @property {User[]} results - List of user objects returned from the API.
 * @property {object} [info] - Metadata about the API response (optional).
 * @property {string} info.seed - Seed used for generating the user data.
 * @property {number} info.results - Number of results returned.
 * @property {number} info.page - The current page number.
 * @property {string} info.version - API version used.
 */
export interface RandomUserApiResponse {
  results: User[];
  info?: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
