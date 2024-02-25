import { createPopper } from "@popperjs/core/lib/popper-lite"
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow'
import flip from '@popperjs/core/lib/modifiers/flip'
import { nextTick } from "vue"

function Popup(target, popup, direction = 'top') {

    let instance = null

    return function () {
        if (!instance) {
            instance = createPopper(target, popup, {
                modifiers: [
                    preventOverflow,
                    flip,
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ],
                placement: direction
            })
            
            nextTick(() => {
                instance.update()
            })

            instance.show = function(){
                
            }
        }

        return instance
    }
}


export default Popup