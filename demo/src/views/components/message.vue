<template>
    <div class="components-message components-page">
        <div class="item" v-for="item in examples" :key="item.desc">
            <div class="display-area">
                <e-button v-for="msg in item.messages" :key="msg" size="default"
                    :type="typeof msg == 'object' ? btns[msg.type] : btns[msg]"
                    @click="sendMessage(msg)">Message</e-button>
            </div>
            <code-demo :desc="item.desc" :type="item.type" :code="item.code" />
        </div>
    </div>
</template>
<script setup>
import { Message } from '@/components/Message'
import CodeDemo from '@/components/CodeDemo'
import EButton from '@/components/Button'
const btns = {
    info: "primary",
    success: "success",
    warning: "warning",
    error: "danger"
}
const sendMessage = (options) => {

    if (typeof options !== 'object') {
        Message[options]('这是一条普通消息')
    } else {
        Message[options.type](options)
    }
}
const examples = [
    {
        desc: "普通消息",
        messages: ["info", "success", "warning", "error"],
        code:
            `Message.info('这是一条普通消息')
Message.success('这是一条成功消息')
Message.warning('这是一条警告消息')
Message.error('这是一条危险消息')`,
        type: "javascript"
    },
    {
        desc: "可配置消息选项",
        messages: [
            {
                type: "info",
                text: "这是一条普通消息",
                duration: 2000
            },
            {
                type: "success",
                text: "这是一条成功消息",
                duration: 3000,
                showClose: true
            },
            {
                type: "warning",
                text: "这是一条自定义消息内容",
                duration: 4000,
                showClose: true
            }
        ],
        code:
            `Message.info({
    type: "info",
    text: "这是一条普通消息",
    duration: 2000
})
Message.success({
    type: "success",
    text: "这是一条成功消息",
    duration: 3000,
    showClose:true
})
Message.warning({
    type: "warning",
    text: "这是一条自定义消息内容",
    duration: 4000,
    showClose:true
})`,
        type: "javascript"
    },
    {
        desc: "消息分组",
        messages: [
            {
                type: "info",
                text: "这是一条分组消息",
                duration: 2000,
                group: true,
                showClose: true
            }
        ],
        code:
            `Message.info({
    type: "info",
    text: "这是一条分组消息",
    duration: 2000,
    group:true,
    showClose: true
})`,
        type: "javascript"
    },
]

</script>
<style lang="scss" scoped>
.display-area {

    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>