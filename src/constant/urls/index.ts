const BASE_URL = 'http://44.196.216.57:8000/';

const ENDPOINT = {
  user_login: 'v1/auth/users/login',
  verify_user: 'v1/auth/agent/verify-otp',
  resend_otp: 'v1/auth/users/resent-otp',
  register_agent: 'v1/auth/agent/register',
  get_agent_details: 'v1/auth/users/agent-detail',
  update_agent_profile: 'v1/auth/agent/profile-update',
  get_city: 'v1/auth/cities',
  get_areas: 'v1/auth/areas',
  get_localities: 'v1/auth/localities',
  get_reviews: 'v1/auth/users/reviews',
  add_reviews: 'v1/auth/users/reviews',
};

export {BASE_URL, ENDPOINT};
