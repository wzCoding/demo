<template>
    <Transition name="fade">
        <div class="loading-mask" v-show="show">
            <div class="loading-spinner">
                <div class="loading-circle"></div>
            </div>
            <div class="loading-text">{{ text }}</div>
        </div>
    </Transition>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { ref,onMounted } from 'vue'
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
        },
        spinner: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        onMounted(() => {
            if (props.spinner) {
                document.querySelector(".loading-spinner").innerHTML = props.spinner
            }
        })
    }
}
</script>
