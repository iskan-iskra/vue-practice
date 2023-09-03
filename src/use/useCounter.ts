import { computed, ref, Ref } from "vue";

interface IUseCounter {
    readonly count: Ref<number>;
    increment: () => void;
    decrement: () => void;
}

// each time of use hook we will get new instance of localCount 

export default function useCounter(initialValue: number = 0): IUseCounter {

    const localCount = ref<number>(initialValue);

    function increment() {
        localCount.value++;
    }

    function decrement() {
        localCount.value--;
    }

    const count = computed<number>(() => localCount.value)

    return {
        count,
        increment,
        decrement,
    }
}