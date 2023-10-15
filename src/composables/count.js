import { reactive, toRefs } from "vue"

export const useCount = () => {
    const state = reactive({
        count:0
    });

    return toRefs(state);
    /*
        toRef 
        하나의 property에 대해 부모 object와의 연결성을 유지한채로 reactive를 반환합니다. 
        이 복사본의 변화는 부모에게도 반영이 되어 추적됩니다.

        toRefs
        reactive의 모든 프로퍼티 대해 toRef를 적용해 반환합니다.
    */
}