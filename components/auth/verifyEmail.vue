<template>
  <div class="form-verify flex justify-center bg-[rgba(0,0,0,0.5)] rounded-[10px]">
    <div class="flex justify-center items-center w-[300px] border-r-[1px] border-[#ccc] m-[26px]">
      <div class="flex justify-center items-center">
        <img width="100px" height="100px"src="/svg/logofile.svg" alt="">
      </div>
    </div>
    <div class="login-box">
      <div class="flex justify-between">
        <h2 class="font-semibold">{{ $t("verify.title") }}</h2>
        <p class="bt-lang"><img class="h-[26px] w-[25px]" src="/svg/global.svg" alt="">
          <ul class="lang box-sd px-3 py-2 bg-[#ccc]" >
              <li class="cursor-pointer" v-for="locale of locales"
                  :key="locale.code"
                  @click="switchLocale(locale)">{{ locale.code }}</li>
          </ul>
        </p>
      </div>
      <form>
        <div class="user-box">
          <div class="form-code">
            <input
              v-for="(input, index) in inputs"
              :key="index"
              ref="codeInputs"
              v-model="codes[index]"
              maxlength="1"
              type="text"
              class="code-input"
            />
          </div>
        </div>
        <a v-if="!showBtn" @click="Accept" href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {{ $t("verify.button") }}
        </a>
        <a-spin v-else />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = userStore();
const { locales, setLocale } = useI18n();
const langDef = ref<string>("vi");
const status = inject<Ref<{ status: string }>>("status");
const showBtn = ref<boolean>(false)
import { toastError, toastSuccess } from '~/function/toast';

const switchLocale = (locale: {code: string}) => {
  langDef.value = locale.code;
  const newLocale: string = locale.code === "vi" ? "vi" : "en";
  setLocale(newLocale);
};

const data: {code: string} = {
  code: "",
};

const codes: Ref<string[]> = ref(["", "", "", "", "", ""]);
const inputs: Ref<number> = ref(6);

const Accept = async () => {
  data.code = codes.value.join("");
  if(data.code.length < 6) {
    toastError('Nhập đủ 6 số OTP!')
    return;
  }
  showBtn.value = true;
  await store.verify(data)
  if(!store.statusVerify) {
    toastError('Nhập sai mã OTP!')
    showBtn.value = false;
    return;
  }
    toastSuccess("Xác minh thành công")
    showBtn.value = false;
    if(status) {
      status.value = "login";
    }
};

onMounted(() => {
  const inputElements = document.querySelectorAll("input.code-input");
  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      console.log(e)
      if (e.keyCode === 8 && e.target.value === "")
        inputElements[Math.max(0, index - 1)].focus();
    });
    ele.addEventListener("input", (e) => {
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? "";
      const lastInputBox = index === inputElements.length - 1;
      const didInsertContent = first !== undefined;
      if (didInsertContent && !lastInputBox) {
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });
});
</script>

<style scoped>
.form-verify {
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
  padding: 16px;
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

.login-box form a {
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

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
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

.login-box a span:nth-child(2) {
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

.login-box a span:nth-child(3) {
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

.login-box a span:nth-child(4) {
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

.bt-lang:hover > ul.lang {
  opacity: 1;
  visibility: visible;
}

.lang {
  position: relative;
  visibility: visible;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  margin-top: 5px;
  opacity: 0;
}

.lang::after {
  content: "";
  display: block;
  height: 15px;
  width: 15px;
  background-color: #ccc;
  position: absolute;
  top: -1px;
  transform: rotate(136deg);
  left: 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}

.form-code {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.form-code > input {
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: none;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
}
</style>

