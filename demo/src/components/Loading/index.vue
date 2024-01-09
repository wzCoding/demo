<template>
    <Transition name="fade">
        <div class="loading-mask" v-show="show">
            <div class="loading-spinner">
                <div class="loading-circle"></div>
                <div v-if="text" class="loading-text">{{ text }}</div>
            </div>
        </div>
    </Transition>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { toRefs } from 'vue';
export default {
    name: "Loading",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: "Loading......"
        }
    },
    setup(props) {
        return toRefs(props);
    }
}
</script>
