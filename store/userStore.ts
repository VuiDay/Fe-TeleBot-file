import axios, { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { dataUser } from "~/components/auth/register.vue";
import type { dataLogin } from "~/components/auth/login.vue";

export const userStore = defineStore("user", {
  state: () => ({
    statusLogin: null,
    statusRegister: null,
    statusVerify: null,
    config: useRuntimeConfig(),
  }),
  getters: {},
  actions: {
    async Login(data: dataLogin) {
      try {
        const cookieToken = useCookie("TKUser");
        const res: AxiosResponse<any> = await axios.post(
          `${this.config.public.urlBackend}/api/user/login`,
          data
        );
        if (!res) throw new Error("Lỗi login!!");
        this.statusLogin = res.data.success;
        if (res.data.message.accessToken) {
          cookieToken.value = res.data.message.accessToken;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async Register(data: dataUser) {
      try {
        const res: AxiosResponse<any> = await axios.post(
          `${this.config.public.urlBackend}/api/user/register`,
          data
        );
        if (!res) throw new Error("Lỗi register!!");
        this.statusRegister = res.data.success;
      } catch (err) {
        console.log(err);
      }
    },
    async verify(data: { code: string }) {
      try {
        const res: AxiosResponse<any> = await axios.post(
          `${this.config.public.urlBackend}/api/user/verify`,
          data
        );
        if (!res) throw new Error("Lỗi verify!!");
        this.statusVerify = res.data.success;
      } catch (err) {
        console.log(err);
      }
    },
  },
  persist: true,
});
