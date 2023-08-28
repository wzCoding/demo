const Mock = require('mockjs')
Mock.setup({ timeout: '1500' })
const url = "https://localhost:5173/demo/mock/data"

Mock.mock(url, (options) => {
    const { id, type } = JSON.parse(options.body)
    const data = require(`./data/${id}/${type}.json`)

    return data[type]
})