const Mock = require('mockjs')
let url = "https://localhost:8081/demo/mock/data"

Mock.setup({ timeout: 500 })
Mock.mock(url, (options) => {
    const { id, type } = JSON.parse(options.body)
    const data = require(`../../public/static/data/${type}/${id}.json`)
    return data[type] ? data[type] : data
})