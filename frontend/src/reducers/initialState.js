export default {
  auth: {
    isAuthenticated: localStorage.getItem('logged_jlconservadora') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
  },
  comments: [],
  ajaxCallsInProgress: 0,
  notifications: {
    active: false,
    message: ''
  }
};
