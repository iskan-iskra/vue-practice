<script lang="ts">
import { defineComponent, onMounted, provide } from "vue";

import useCounterStore from "./use/useCounterStore";
import { myInjectionKey } from "./provider/counterProvider";

import AppCounter from "./components/AppCounter.vue";
import AppCounterWithHook from "./components/AppCounterWithHook.vue";
import AppCounterWithStore from "./components/AppCounterWithStore.vue";
import AppCounterWithHookStore from "./components/AppCounterWithHookStore.vue";
import AppCounterContext from "./components/AppCounterContext.vue";
import useCounter from "./use/useCounter";
import AppCounterControlled from "./components/AppCounterControlled.vue";

export default defineComponent({
  name: "App",
  components: {
    AppCounter,
    AppCounterWithHook,
    AppCounterWithStore,
    AppCounterContext,
    AppCounterControlled,
    AppCounterWithHookStore,
  },

  setup() {
    const { setCount } = useCounterStore();

    const { count, decrement, increment } = useCounter(0);

    const {
      count: controlCounter,
      decrement: controlDecrement,
      increment: controlIncrement,
    } = useCounter(0);

    const pair = [1, 2];

    provide(myInjectionKey, {
      counter: count,
      increment: increment,
      decrement: decrement,
    });

    onMounted(() => {
      setCount(5);
    });

    return {
      pair,
      controlCounter,
      controlDecrement,
      controlIncrement,
    };
  },
});
</script>

<template>
  <VApp>
    <VContainer>
      <VRow>
        <VCol :cols="12">
          <h2>Independent components</h2>
        </VCol>
      </VRow>
      <VRow align-content="stretch">
        <VCol
          cols="6"
          sm="4"
          md="3"
          lg="3"
          v-for="(card, index) in pair"
          :key="index"
        >
          <AppCounter :title="`Counter - ${card}`" />
        </VCol>
        <VCol cols="12" sm="4" md="6" lg="6">
          <VCard class="card">
            <VCardTitle>Basic component</VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol>
                    <h4>advantages:</h4>
                    <ul>
                      <li>easy to create</li>
                      <li>fast solution</li>
                    </ul>
                  </VCol>
                  <VCol>
                    <h4>disadvantages:</h4>
                    <ul>
                      <li>realization and ui mixed</li>
                      <li>hard to reuse</li>
                    </ul>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="6"
          sm="4"
          md="3"
          lg="3"
          v-for="(card, index) in pair"
          :key="index"
        >
          <AppCounterWithHook :title="`Counter - ${card}`" />
        </VCol>
        <VCol cols="12" sm="4" md="6" lg="6">
          <VCard class="card">
            <VCardTitle>Basic hook</VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol>
                    <h4>advantages:</h4>
                    <ul>
                      <li>easy to create</li>
                      <li>easy to expand functionality</li>
                    </ul>
                  </VCol>
                  <VCol>
                    <h4>disadvantages:</h4>
                    <ul>
                      <li>a value is not defined out of the component</li>
                    </ul>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VDivider />
        </VCol>
        <VCol :cols="12">
          <h2>Related components</h2>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="6"
          sm="4"
          md="3"
          lg="3"
          v-for="(card, index) in pair"
          :key="index"
        >
          <AppCounterControlled
            v-bind="{
              modelValue: controlCounter,
              onDecrement: controlDecrement,
              onIncrement: controlIncrement,
            }"
            :title="`Counter - ${card}`"
          />
        </VCol>
        <VCol cols="12" sm="4" md="6" lg="6">
          <VCard class="card">
            <VCardTitle>Controlled component </VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol>
                    <h4>advantages:</h4>
                    <ul>
                      <li>easy to create</li>
                      <li>easy to expand functionality</li>
                    </ul>
                  </VCol>
                  <VCol>
                    <h4>disadvantages:</h4>
                    <ul>
                      <li>hard to manipulate with components tree</li>
                    </ul>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="6"
          sm="4"
          md="3"
          lg="3"
          v-for="(card, index) in pair"
          :key="index"
        >
          <AppCounterContext :title="`Counter - ${card}`" />
        </VCol>
        <VCol cols="12" sm="4" md="6" lg="6">
          <VCard class="card">
            <VCardTitle>Context</VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol>
                    <h4>advantages:</h4>
                    <ul>
                      <li>easy to transfer data in components tree</li>
                      <li>more native for vue js</li>
                    </ul>
                  </VCol>
                  <VCol>
                    <h4>disadvantages:</h4>
                    <ul>
                      <li>hard to construct</li>
                      <li>require vue knowledge</li>
                    </ul>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="6"
          sm="4"
          md="3"
          lg="3"
          v-for="(card, index) in pair"
          :key="index"
        >
          <AppCounterWithHookStore :title="`Counter - ${card}`" />
        </VCol>
        <VCol cols="12" sm="4" md="6" lg="6">
          <VCard class="card">
            <VCardTitle>Hook with store </VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol>
                    <h4>advantages:</h4>
                    <ul>
                      <li>easy to transfer data in components tree</li>
                      <li>easy to control and construct</li>
                    </ul>
                  </VCol>
                  <VCol>
                    <h4>disadvantages:</h4>
                    <ul>
                      <li>less native for vue js</li>
                      <li>require hook knowledge</li>
                    </ul>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="6"
          sm="4"
          md="3"
          lg="3"
          v-for="(card, index) in pair"
          :key="index"
        >
          <AppCounterWithStore :title="`Counter - ${card}`" />
        </VCol>
        <VCol cols="12" sm="4" md="6" lg="6">
          <VCard class="card">
            <VCardTitle>Hook with store </VCardTitle>
            <VCardText>
              <VContainer>
                <VRow>
                  <VCol>
                    <h4>advantages:</h4>
                    <ul>
                      <li>easy to transfer data in components tree</li>
                      <li>easy to control and construct</li>
                      <li>simple store based on reactive</li>
                    </ul>
                  </VCol>
                  <VCol>
                    <h4>disadvantages:</h4>
                    <ul>
                      <li>less native for vue js</li>
                      <li>require hook knowledge</li>
                      <li>no mutation in store</li>
                    </ul>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VApp>
</template>

<style scoped lang="scss">
.card {
  height: 100%;
}
</style>
