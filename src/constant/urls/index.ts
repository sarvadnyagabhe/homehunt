const BASE_URL = 'http://44.196.216.57:8000/';

const ENDPOINT = {
  //Auth
  user_login: 'v1/auth/users/login',
  agent_login: 'v1/auth/agent/login',

  verify_user: 'v1/auth/users/verify-otp',
  verify_agent: 'v1/auth/agent/verify-otp',

  resend_user_otp: 'v1/auth/users/resent-otp',
  resend_agent_otp: 'v1/auth/agent/resent-otp',

  register_user: 'v1/auth/users/register',
  register_agent: 'v1/auth/agent/register',

  //App
  get_agent_by_location: 'v1/auth/users/by-location',
  get_agent_details: 'v1/auth/users/agent-detail',
  update_agent_profile: 'v1/auth/agent/profile-update',
  get_city: 'v1/auth/cities',
  get_areas: 'v1/auth/areas',
  get_localities: 'v1/auth/localities',
  get_reviews: 'v1/auth/users/reviews',
  add_reviews: 'v1/auth/users/reviews',
};

export {BASE_URL, ENDPOINT};
