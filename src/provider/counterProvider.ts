import { Ref, InjectionKey } from "vue";

export interface IContextCounter {
    counter: Ref<number>,
    increment: () => void,
    decrement: () => void,
}

export const myInjectionKey: InjectionKey<IContextCounter> = Symbol('_COUNTER_')

