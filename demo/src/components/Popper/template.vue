<template>
    <teleport to='body'>
        <div class="popup" role="popup" ref="popup">
            <div class="popup-box">
                <slot></slot>
            </div>
            <div class="popup-arrow" data-popper-arrow></div>
        </div>
    </teleport>
</template>
<script>
import { ref, onMounted, nextTick } from 'vue';
import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
export default {
    name: 'Popup',
    props: {
        target: {
            type: [String, Object],
            default: () => { return '' },
        },
        direction: {
            type: String,
            default: 'bottom',
        }
    },
    setup(props) {
        let instance
        const popup = ref(null)
        const target = ref(null)

        const show = () => {
            popup.value.setAttribute('data-show', '');

            instance.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: true },
                ],
            }));

            instance.update();
        }

        const hide = () => {
            popup.value.removeAttribute('data-show');

            instance.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: false },
                ],
            }));

            nextTick(()=>{
                instance.update();
            })
        }

        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];


        onMounted(() => {
            if (typeof props.target === 'string') {
                target.value = document.getElementById(props.target) || document.getElementsByClassName(props.target)[0]
            }
            console.log(target.value)
            console.log(popup.value)
            instance = createPopper(target.value, popup.value, {
                placement: props.direction,
                modifiers: [
                    // preventOverflow,
                    // flip,
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                ]
            })

            showEvents.forEach((event) => {
                target.value.addEventListener(event, show);
            });

            hideEvents.forEach((event) => {
                target.value.addEventListener(event, hide);
            });
        })
        return {
            popup
        }
    }
}
</script>
<style src="./index.scss" lang="scss" scoped></style>