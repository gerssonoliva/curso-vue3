import { defineStore } from "pinia";
import authService from "@/modules/auth/services/authService";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {

  const token = ref(localStorage.getItem("access_token") || null);
  const isAuthenticated = computed(() => token.value ? true : false);

  async function login(credentials) {

    try {
      const response = await authService.login(credentials);
      token.value = response.access_token;
      localStorage.setItem("access_token", response.access_token);
      
    } catch (error) {
      throw error;
    }

  }

  return {
    isAuthenticated,
    login
  }

});