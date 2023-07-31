const Mock = require('mockjs')
Mock.setup({ timeout: '200-600' })
const url = "https://localhost:5173/demo/mock/data"

Mock.mock(url, (options) => {
    const { id } = JSON.parse(options.body)
    const data = require(`./data/${id}.json`)

    return data[id]
})