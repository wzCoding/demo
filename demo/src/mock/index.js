const Mock = require('mockjs')
let url = "https://localhost:5173/demo/mock/data"

Mock.setup({ timeout: 2000 })
Mock.mock(url, (options) => {
    const { id, type } = JSON.parse(options.body)
    const data = require(`./data/${id}/${type}.json`)
    return data[type]
})