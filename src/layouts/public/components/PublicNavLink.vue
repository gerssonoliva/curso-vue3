<script setup>

  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';

  const props = defineProps({
    to: {
      type: [ String, Object ],
      required: true
    }
  });

  const route = useRoute();

  const isActive = computed(() => {
    if(!props.to) {
      return false;
    }
    if(typeof props.to === 'string') {
      return route.path === props.to;
    } else if(typeof props.to === 'object') {
      return route.path === props.to.path;
    }
  });

</script>

<template>
  <RouterLink
    :to="props.to"
    :class="{ 
      'block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0' : isActive,
      'block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent' : !isActive
    }"
  >
    <slot></slot>
  </RouterLink>
</template>