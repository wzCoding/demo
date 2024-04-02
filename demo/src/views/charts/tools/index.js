import JSON5 from 'json5'
async function getMapData(code) {
    if (!code) return
    const url = `https://geojson.cn/api/data/${code}.topo.json`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    //返回Stream流数据
    const result = await fetch(url, options)
    //读取流数据
    const read = await result.body.getReader().read()
    const decoder = new TextDecoder('utf-8')
    const data = decoder.decode(read.value, { stream: true })
   
    return JSON5.parse(data)
}

export {
    getMapData
}