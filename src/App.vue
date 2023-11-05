<script lang="ts">
import {computed, defineComponent, onMounted, provide, ref} from "vue";

import useCounterStore from "./use/useCounterStore";
import { myInjectionKey } from "./provider/counterProvider";

import AppCounter from "./components/AppCounter.vue";
import AppCounterWithHook from "./components/AppCounterWithHook.vue";
import AppCounterWithStore from "./components/AppCounterWithStore.vue";
import AppCounterWithHookStore from "./components/AppCounterWithHookStore.vue";
import AppCounterContext from "./components/AppCounterContext.vue";
import useCounter from "./use/useCounter";
import AppCounterControlled from "./components/AppCounterControlled.vue";
import {useTheme} from "vuetify";

type TiTheme = 'dark' | 'light'

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

    const currentThemeMode = ref<TiTheme>('light')

    const theme = useTheme()

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

    const toggleTheme = () => {
      currentThemeMode.value = currentThemeMode.value === 'light' ? 'dark' : 'light'
      theme.global.name.value = currentThemeMode.value
      localStorage.setItem('theme',currentThemeMode.value)
    }

    const themeInit = () => {
      const localStorageTheme = localStorage.getItem('theme') as TiTheme
      const listOfAllThemes = ['dark', 'light'] as TiTheme[]
      if(localStorageTheme && listOfAllThemes.includes(localStorageTheme)) {
        theme.global.name.value = localStorageTheme
        currentThemeMode.value = localStorageTheme as TiTheme
        theme.global.name.value = localStorageTheme
      }
    }

    const themeTitle = computed<string>(()=>{
      switch (currentThemeMode.value) {
        case "light":
          return 'Dark theme'
        case "dark":
          return 'Light theme'
        default:
          return 'Dark theme'
      }
    })

    onMounted(() => {
      setCount(5);
      themeInit()
    });

    return {
      toggleTheme,
      themeTitle,
      pair,
      controlCounter,
      controlDecrement,
      controlIncrement,
    };
  },
});
</script>

<template>
  <div class="header">
      <VBtn @click="toggleTheme">{{themeTitle}}</VBtn>
  </div>

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
            <VCardTitle>Reactive store </VCardTitle>
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
.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 10000;
}
</style>
