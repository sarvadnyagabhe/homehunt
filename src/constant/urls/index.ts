const BASE_URL = 'http://44.196.216.57:8000/';

const ENDPOINT = {
  user_login: 'v1/auth/users/login',
  resend_otp: 'v1/auth/users/resent-otp',
  register_agent: 'v1/auth/agent/register',
  get_locations: 'v1/auth/localities',
  get_reviews: 'v1/auth/users/reviews',
};

export {BASE_URL, ENDPOINT};
