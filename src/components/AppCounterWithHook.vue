<script lang="ts">
import { defineComponent } from "vue";

import useCounter from "../use/useCounter";
import { computed } from "vue";

export default defineComponent({
  name: "AppCounterWithHook",

  props: {
    counterInitialValue: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
  },

  setup(props) {
    const {
      count: myCounter,
      decrement: decreaseCounter,
      increment: increaseCounter,
    } = useCounter(props.counterInitialValue);

    const cardTitle = computed(() => {
      return props.title || "Counter";
    });

    return { cardTitle, myCounter, increaseCounter, decreaseCounter };
  },
});
</script>

<template>
  <VCard class="card">
    <VCardTitle class="bg-blue-grey">{{ cardTitle }}</VCardTitle>
    <VCardSubtitle>Basic hook</VCardSubtitle>
    <VContainer>
      <VRow align-content="center" justify="center">
        <VCol cols="auto">
          <VChip>{{ myCounter }}</VChip>
        </VCol>
      </VRow>
      <VRow align-content="center" justify="center">
        <VCol cols="auto">
          <VBtn color="success" variant="tonal" @click="increaseCounter">
            Increase + 1
          </VBtn>
        </VCol>
        <VCol cols="auto">
          <VBtn color="error" variant="tonal" v-on:click="decreaseCounter">
            Decrease - 1
          </VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>

<style scoped>
.card {
  height: 100%;
}
</style>
