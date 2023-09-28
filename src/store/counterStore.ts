import { reactive } from "vue";

interface ICounterStore {
    counter: number,
    increment: () => void,
    decrement: () => void,
    setCount: (val: number) => void
}


export const counterStore = reactive<ICounterStore>({
    counter: 0,
    increment() {
        this.counter++
    },
    decrement() {
        this.counter--
    },
    setCount(val: number) {
        this.counter = val
    }
})