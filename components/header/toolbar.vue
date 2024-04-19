<template>
  <div class="fixed left-0">
    <div class="py-[20px] px-[20px]">
      <NuxtLink
        v-for="(menu, key) of Menu"
        class="flex items-end text-[17px] cursor-pointer mt-[20px] py-[30px] border-b-[1px]"
        ><img
          width="30px"
          height="auto"
          :src="menu.icon"
          alt=""
          class="mr-[5px]"
        />{{ menu.name }}</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const Menu = [
  {
    name: t("toolbar.homePage"),
    icon: "/svg/ToolBar/homepage.svg",
  },
  {
    name: t("toolbar.infor"),
    icon: "/svg/ToolBar/infor.svg",
  },
  {
    name: t("toolbar.security"),
    icon: "/svg/ToolBar/security.svg",
  },
  {
    name: t("toolbar.share"),
    icon: "/svg/ToolBar/share.svg",
  },
  {
    name: t("toolbar.payment"),
    icon: "/svg/ToolBar/payment.svg",
  },
];
console.log(locale);
</script>

<style scoped></style>
