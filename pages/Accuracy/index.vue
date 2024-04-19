<template>
  <component :is="isComponentModal">
    <!-- <template>
      <button @click="hello">click</button>
    </template> -->
  </component>
</template>

<script setup lang="ts">
const authlogin = resolveComponent("AuthLogin");
const authregister = resolveComponent("AuthRegister");
const authverify = resolveComponent("AuthVerifyEmail");
const status = ref("");
const isComponentModal = ref(authlogin);
provide("status", status);

watchEffect(() => {
  if (status.value === "register") {
    isComponentModal.value = authregister;
    return;
  } else if (status.value === "verify") {
    isComponentModal.value = authverify;
    return;
  }
  isComponentModal.value = authlogin;
});

definePageMeta({
  layout: "accuracy",
  middleware: "auth",
});
</script>

<style lang="scss" scoped></style>
