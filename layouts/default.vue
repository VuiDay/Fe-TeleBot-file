<template>
  <div>
    <HeaderTaskbar />
    <div class="flex mt-[90px]">
      <HeaderToolbar class="w-[358px] mr-[20px] h-[100vh]" />
      <div class="ml-[350px] h-[100vh] py-[20px] px-[20px]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
