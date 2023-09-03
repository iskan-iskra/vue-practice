import { computed, ref, Ref } from "vue";

interface IUseCounterStore {
    readonly count: Ref<number>;
    increment: () => void;
    decrement: () => void;
    setCount: (count: number) => void;
}

// each time of use hook we will get new same store of localCount 

const localCount = ref<number>(0);

const isHookInitiated = ref<boolean>(false)

export default function useCounterStore(): IUseCounterStore {

    function increment() {
        localCount.value++;
    }

    function decrement() {
        localCount.value--;
    }

    function setCount(count: number) {
        if (isHookInitiated.value) {
            console.log('value already initiated');
            return
        } else {
            isHookInitiated.value = true;
            localCount.value = count;
        }
    }

    const count = computed<number>(() => localCount.value)


    return {
        count,
        increment,
        decrement,
        setCount,
    }
}