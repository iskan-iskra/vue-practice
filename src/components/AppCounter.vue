<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppCounter",

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
    const myCounter = ref<number>(props.counterInitialValue);

    const increaseCounter = () => {
      myCounter.value++;
    };

    const decreaseCounter = () => {
      myCounter.value--;
    };

    const cardTitle = computed(() => {
      return props.title || "Counter";
    });

    return { cardTitle, myCounter, increaseCounter, decreaseCounter };
  },
});
</script>

<template>
  <VCard class="card">
    <VCardTitle class="bg-grey">{{ cardTitle }}</VCardTitle>
    <VCardSubtitle>Basic component</VCardSubtitle>
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
