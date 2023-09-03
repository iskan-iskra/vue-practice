<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppCounter",

  setup() {
    const myCounter = ref<number>();

    return { myCounter };
  },
});
</script>

<style scoped></style>
