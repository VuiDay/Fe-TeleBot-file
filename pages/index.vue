<template>
  <div>{{ $t("welcome") }}</div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
