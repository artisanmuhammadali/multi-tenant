<template>
<nav class="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">{{ $route.meta.title }}</li>
          </ol>
        </nav>
        <div class="collapse navbar-collapse  mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <ul class="navbar-nav d-flex align-items-center ms-md-auto  justify-content-end">
            <li class="nav-item d-flex align-items-center">
              <a href="#" class="nav-link text-body font-weight-bold px-0 d-flex">
                <i class="material-symbols-rounded">account_circle</i>
                {{$auth.user?.name}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
