<template>
  <div
    class="form-regi flex justify-center bg-[rgba(0,0,0,0.5)] rounded-[10px]"
  >
    <div
      class="flex justify-center items-center w-[300px] border-r-[1px] border-[#ccc] m-[26px]"
    >
      <div class="flex justify-center items-center">
        <img width="100px" height="100px" src="/svg/logofile.svg" alt="" />
      </div>
    </div>
    <div class="login-box">
      <div class="flex justify-between">
        <h2 class="font-semibold">{{ $t("register.title") }}</h2>
      </div>
      <form>
        <div class="user-box">
          <input type="text" name="" required v-model="username" />
          <label>{{ $t("register.username") }}</label>
        </div>
        <div class="user-box">
          <input type="email" name="" required v-model="email" />
          <label>{{ $t("register.email") }}</label>
        </div>
        <div class="user-box relative">
          <input
            :type="show ? 'text' : 'password'"
            name=""
            required
            v-model="password"
          />
          <label>{{ $t("register.password") }}</label>
          <p class="absolute top-0 right-3 translate-x-2/4 translate-y-2/4">
            <input @click="showPw" class="!m-0" type="checkbox" name="" id="" />
          </p>
        </div>
        <div class="user-box">
          <select name="" id="mySelect" v-model="gender">
            <option value="" disabled selected hidden>
              {{ $t("register.gender") }}
            </option>
            <option :value="$t('register.male')">
              {{ $t("register.male") }}
            </option>
            <option :value="$t('register.female')">
              {{ $t("register.female") }}
            </option>
            <option :value="$t('register.other')">
              {{ $t("register.other") }}
            </option>
          </select>
        </div>
        <div class="user-box">
          <input type="date" name="" required v-model="datebd" />
        </div>
        <div
          class="py-2 text-white flex justify-between items-center"
          style="border-bottom: 1px solid white"
        >
          <input
            @change="handleFile"
            id="ava"
            type="file"
            name=""
            required
            class="hidden"
          />
          <label
            for="ava"
            class="border-[white] p-[10px] bg-[#ccc] text-black"
            >{{ $t("register.avatar") }}</label
          >
          <div class="w-[60px] h-[60px] flex justify-center items-center">
            <a-avatar :size="60" :src="imageShow" />
          </div>
        </div>
        <div class="flex justify-end mt-[20px]">
          <p class="underline cursor-pointer" @click="changeCm">
            {{ $t("register.nonregister") }}
          </p>
        </div>
        <button v-if="!showBtn" @click.prevent="register()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {{ $t("register.button") }}
        </button>
        <a-spin v-else />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toastError, toastSuccess } from "~/function/toast";
const store = userStore();
const status = inject<{ status: string }>("status");
const show = ref<boolean>(false);
const showBtn = ref<boolean>(false);
//
const image = ref<any>("");
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const gender = ref<string>("");
const datebd = ref<string>("");

export interface dataUser {
  email: string;
  username: string;
  password: string;
  gender: string;
  avatar: string;
  dateofbirth: string;
}

let data: dataUser = {
  email: "",
  username: "",
  password: "",
  gender: "",
  avatar: "",
  dateofbirth: "",
};
//

const imageShow = ref<string>(
  "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
);

const handleFile = (event: any) => {
  const file = event.target.files[0];
  console.log(file);
  base64File(file);
  if (file.type.startsWith("image/")) {
    const imageURL = URL.createObjectURL(file);
    imageShow.value = imageURL;
    console.log(imageShow.value);
  }
};

const changeCm = () => {
  if (status) {
    status.value = "login";
  }
};

const showPw = () => {
  show.value = !show.value;
};

const userName = (data: any) => {
  // Xoá dấu tiếng Việt và chuyển về chuỗi không dấu
  const normalized = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Xoá khoảng trắng và ký tự không mong muốn
  const trimmed = normalized.replace(/\s+/g, "");
  return trimmed.toLowerCase();
};

const calculateAge = (birthday: Date): number => {
  const dateNow: Date = new Date();
  return Math.ceil(dateNow.getFullYear() - birthday.getFullYear());
};

const base64File = (file: any) => {
  let reader = new FileReader();
  reader.onloadend = () => {
    image.value = reader.result;
    console.log(image.value);
  };
  reader.readAsDataURL(file);
};

const register = async () => {
  if (
    username.value === "" &&
    email.value === "" &&
    password.value === "" &&
    gender.value === "" &&
    datebd.value === ""
  ) {
    toastError("Không để trống thông tin!");
    return;
  }
  const dateUser: Date = new Date(datebd.value);
  const age = calculateAge(dateUser);
  console.log(age);
  if (age < 16) {
    toastError("Yêu cầu người dùng trên 16 tuổi!");
    return;
  }
  (data.username = userName(username.value)),
    (data.email = email.value),
    (data.avatar = image.value),
    (data.password = password.value),
    (data.dateofbirth = datebd.value),
    (data.gender = gender.value);
  showBtn.value = true;
  await store.Register(data);
  if (store.statusRegister === true) {
    toastSuccess("Đăng kí tài khoản thành công");
    showBtn.value = false;
    if (status) {
      status.value = "verify";
    }
  } else {
    toastError("Đăng kí thất bại!");
    showBtn.value = false;
  }
};
</script>

<style scoped>
.form-regi {
  opacity: 0;
  transform: translateY(-50px);
  animation: onLoad 0.5s ease-in-out forwards;
}

@keyframes onLoad {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.login-box {
  width: 400px;
  padding: 40px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box select {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

#mySelect option {
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  margin: 10px;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
