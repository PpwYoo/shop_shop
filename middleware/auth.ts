export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token').value
  if (!token) {
    console.log('Please login first!!')
    return navigateTo('/login')
  }
})