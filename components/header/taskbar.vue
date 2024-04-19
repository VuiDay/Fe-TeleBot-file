<template>
  <div class="flex items-center justify-between px-[20px] fixed w-[100%] top-0 left-0 right-0 bg-[white]" :class="isScroll ? 'header' : ''">
    <div class="header-left flex items-center w-[50%]">
      <div class="flex items-center w-[33%]">
        <div>
          <img width="90px" height="auto" src="/svg/logofile.svg" alt="" />
        </div>
      </div>
      <div class="search flex items-center w-[100%] rounded-full" :class="status ? 'bg-change': ''">
        <div class="h-[48px] w-[40px] flex justify-center cursor-pointer bg-[#ccc] focus:bg-[white]" :class="status ?'bg-[white]' :''" style="border-radius: 50px 0 0 50px;">
          <img width="25px" height="auto" src="/svg/search.svg" alt="">
        </div>
        <input @blur="changeStatus(false)" @focus="changeStatus(true)" :placeholder="$t('header.input.search')" type="text" class="input-search px-2 py-3 focus:bg-[white] bg-[#ccc] w-[100%]" style="border-radius: 0 50px 50px 0;">
      </div>
    </div>
    <div class="header-right flex items-center">
      <div class="px-[10px] border-r-[1px] border-[#ccc]">
        <p class="bt-lang"><img class="h-[26px] w-[25px]" src="/svg/global.svg" alt="">
          <ul class="lang box-sd px-3 py-2 bg-[#ccc]" >
              <li class="cursor-pointer" v-for="locale of locales"
                  :key="locale.code"
                  @click="switchLocale(locale)">{{ locale.code }}</li>
          </ul>
        </p>
      </div>
      <div class="flex items-center px-[10px]">
        <a-avatar class="cursor-[pointer]" @click="showModal('inforuser')" src="https://res.cloudinary.com/dn6xdmqbl/image/upload/v1712331370/avatar_user/iyzob6hxkqqhiyzvx0fo.png" />
      </div>
      <a-modal v-model:open="open" title="Title" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <component :is="modalActive"></component>
    </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = userStore();
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const modalActive = ref<string>("");

const mapModal = {
  inforuser: resolveComponent('InforUserModal-Infor')
}

const showModal = (name: string): void => {
  if(!mapModal[name]) return false
  modalActive.value = mapModal[name];
  open.value = true;
};

const handleOk = (): void => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 2000);
};

const handleCancel = (): void => {
  open.value = false;
};

const { locales, setLocale } = useI18n();
const langDef = ref<string>("vi");
const status = ref<boolean>(false)

const switchLocale = (locale: {code: string}): void => {
  langDef.value = locale.code;
  const newLocale: string = locale.code === "vi" ? "vi" : "en";
  setLocale(newLocale);
};

const changeStatus = (data: boolean): void => {
  status.value = data
}

//scroll
const isScroll = ref(false);
const handleScroll = () => {
  isScroll.value = window.scrollY > 30;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeMount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.header {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: .2s;
}

.header-right {
  position: relative;
}

.bt-lang:hover > ul.lang {
  opacity: 1;
  visibility: visible;
}

.lang {
  left: 2px;
  position: absolute;
  visibility: visible;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  margin-top: 5px;
  opacity: 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 50px;
}



.input-search:focus {
  border-color: red;
  outline: none;
}

.bg-change {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
}
</style>
