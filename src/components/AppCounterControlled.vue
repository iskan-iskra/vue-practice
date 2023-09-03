<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "AppCounterControlled",

  props: {
    title: {
      type: String,
    },

    modelValue: {
      type: Number,
      required: true,
    },
  },

  emits: ["increment", "decrement"],

  setup(props, { emit }) {
    const myCounter = computed(() => props.modelValue);

    const increaseCounter = () => {
      emit("increment");
    };

    const decreaseCounter = () => {
      emit("decrement");
    };

    const cardTitle = computed(() => {
      return props.title || "Counter";
    });

    return {
      cardTitle,
      myCounter,
      increaseCounter,
      decreaseCounter,
    };
  },
});
</script>

<template>
  <VCard class="card">
    <VCardTitle class="bg-blue">{{ cardTitle }}</VCardTitle>
    <VCardSubtitle>Controlled component</VCardSubtitle>
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

<style scoped lang="scss">
.card {
  height: 100%;
}
</style>
