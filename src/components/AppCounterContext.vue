<script lang="ts">
import { inject } from "vue";
import { computed, defineComponent } from "vue";

import { myInjectionKey } from "../provider/counterProvider";

export default defineComponent({
  name: "AppCounterContext",

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
    const injectedCount = inject(myInjectionKey);

    const increaseCounter = () => {
      injectedCount?.increment();
    };

    const decreaseCounter = () => {
      injectedCount?.decrement();
    };

    const cardTitle = computed(() => {
      return props.title || "Counter";
    });

    return {
      count: injectedCount?.counter,
      cardTitle,
      increaseCounter,
      decreaseCounter,
    };
  },
});
</script>

<template>
  <VCard class="card">
    <VCardTitle class="bg-purple">{{ cardTitle }}</VCardTitle>
    <VCardSubtitle>Context</VCardSubtitle>
    <VContainer>
      <VRow align-content="center" justify="center">
        <VCol cols="auto">
          <VChip>{{ count }}</VChip>
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

<style scoped lang="scss">
.card {
  height: 100%;
}
</style>
