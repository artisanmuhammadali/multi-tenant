<template>
  <div class="container my-auto">
    <div class="mx-auto max-w-screen-sm text-center text-white">
      <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">403</h1>
      <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Access Denied</p>
      <p class="mb-4 text-lg font-light text-white">
        You dont have permission to view this site.
      </p>

      <RouterLink
        to="/dashboard"
        class="text-white text-center bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
        >Back To Home</RouterLink
      >
    </div>
  </div>
</template>
