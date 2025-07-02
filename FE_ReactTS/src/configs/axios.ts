import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor: Add Authorization header with Bearer token
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = null;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Refresh token function
const getNewRefreshToken = async (refreshToken: string) => {
  const url = `Auth/RefreshToken`;
  const response = await instance.post(url, {
    refreshToken: refreshToken
  });
  localStorage.setItem('refreshToken', response.data.refreshToken);
  localStorage.setItem('accessToken', response.data.accessToken);
};

// Response interceptor: Handle 401 Unauthorized and refresh token
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Refresh the token
          await getNewRefreshToken(refreshToken);
          // Thử lại request ban đầu với token mới
          const originalRequest = error.config;
          return instance(originalRequest);
        } catch (refreshError) {
          // Logout if failed to refresh token
          localStorage.removeItem('accessToken');
          localStorage.removeItem('email');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      } else {
        // Log out if no refresh token is available
        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
