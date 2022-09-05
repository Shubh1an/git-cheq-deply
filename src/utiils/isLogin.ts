export const isLogin = () => {
  return localStorage.getItem('authToken') ? true : false
}
