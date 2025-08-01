<template>
    <div class="container my-auto">
    <div class="mx-auto max-w-screen-sm text-center">
      <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">404</h1>
      <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Page Not Found</p>
      <p class="mb-4 text-lg font-light text-white">
        The page you're looking for doesn't exist.
      </p>

      <RouterLink
        to="/dashboard"
        class="text-white text-center bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
        >Back To Home</RouterLink
      >
    </div>
  </div>
</template>
