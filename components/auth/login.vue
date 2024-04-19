<template>
  <div
    class="form-login flex justify-center bg-[rgba(0,0,0,0.5)] rounded-[10px]"
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
        <h2 class="font-semibold">{{ $t("login.title") }}</h2>
      </div>
      <form>
        <div class="user-box">
          <input type="email" name="" v-model="email" required />
          <label>{{ $t("login.email") }}</label>
        </div>
        <div class="user-box">
          <input
            :type="show ? 'text' : 'password'"
            name=""
            v-model="password"
            required
          />
          <label>{{ $t("login.password") }}</label>
          <p class="absolute top-0 right-3 translate-x-2/4 translate-y-2/4">
            <input @click="showPw" class="!m-0" type="checkbox" name="" id="" />
          </p>
        </div>
        <div class="flex justify-end">
          <p class="underline cursor-pointer" @click="changeCm">
            {{ $t("login.nonlogin") }}
          </p>
        </div>
        <button v-if="!showBtn" @click.prevent="submitLogin">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {{ $t("login.button") }}
        </button>
        <a-spin v-else />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = userStore();
const status = inject<Ref<{ status: string }>>("status");
const checkLogin = ref<boolean>(false);
const show = ref<boolean>(false);
const showBtn = ref<boolean>(false);
import { toastError, toastSuccess } from "~/function/toast";

//
const email = ref<string>("");
const password = ref<string>("");

export interface dataLogin {
  email: string;
  password: string;
}

const data: dataLogin = {
  email: "",
  password: "",
};

//show pw
const showPw = () => {
  show.value = !show.value;
};

const changeCm = () => {
  if (status) {
    status.value = "register";
  }
};

const submitLogin = async () => {
  if (!email.value || !password.value) {
    toastError("Yêu cầu ko bỏ trống thông tin!");
    return;
  }
  data.email = email.value;
  data.password = password.value;
  showBtn.value = true;
  await store.Login(data);
  if (store.statusLogin === true) {
    toastSuccess("Đăng nhập thành công");
    showBtn.value = false;
    setTimeout(() => {
      window.location.reload();
    }, 200);
  } else {
    toastError("Sai email hoặc mật khẩu!");
    showBtn.value = false;
  }
};
</script>

<style scoped>
.form-login {
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
