<script setup>

  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import router from '@/router';
  import { useAuthStore } from '@/stores/authStore';
  import FormInput from '@/modules/shared/components/FormInput.vue';
  import FormLabel from '@/modules/shared/components/FormLabel.vue';
  import MyButton from '@/modules/shared/components/MyButton.vue';
  
  const authStore = useAuthStore();

  const credentials = reactive({
    email: 'victor@codersfree.com',
    password: '12345678'
  });

  const errors = ref([]);
  const isLoading = ref(false);

  async function handleLogin() {
    try {
      isLoading.value = true;
      await authStore.login(credentials);
      router.push('/');
    } catch (error) {
      // console.log(error);
      const responseErrors = error.errors;
      for (const field in responseErrors) {
        errors.value.push(responseErrors[field][0]);
      }
      console.log(errors.value);
      
    } finally {
      isLoading.value = false;
    }
  }

</script>
<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Inicia sesión en tu cuenta
  </h1>

  <div v-if="errors.length" class="flex p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft border border-danger-subtle" role="alert">
    <svg class="w-4 h-4 me-2 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
    <span class="sr-only">Danger</span>
    <div>
      <span class="font-medium">Ensure that these requirements are met:</span>
        <ul class="mt-2 list-disc list-outside space-y-1 ps-2.5">
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
      </ul>
    </div>
  </div>

  <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
      <div>
          <FormLabel for="email">Your email</FormLabel>
          <FormInput v-model="credentials.email" type="email" name="email" id="email" placeholder="name@company.com"  />
      </div>
      <div>
          <FormLabel for="password">Password</FormLabel>
          <FormInput v-model="credentials.password" type="password" name="password" id="password" placeholder="••••••••"  />
      </div>
      <div class="flex items-center justify-between">
          <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
              </div>
              <div class="ml-3 text-sm">
                <FormLabel for="remember">Remember me</FormLabel>
              </div>
          </div>
          <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
      </div>
      <MyButton 
        type="submit" 
        color="success"
        :disabled="isLoading"
        class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Sign in
      </MyButton>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
      </p>
  </form>
</template>