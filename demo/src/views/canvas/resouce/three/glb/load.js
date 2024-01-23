import { TextureLoader, MultiplyBlending, Mesh, PlaneGeometry, MeshBasicMaterial, Box3 } from "three"
import { createLoader } from "../components/loader"


async function loadGlbModel(options = {
    modelPath: "../static/models/ferrari.glb",
    texturePath: "../static/texture/ferrari_ao.png",
    carWidth: 2.5,
    carLength: 5.2,
    enlarge: 4.5,
    body: {},
    glass: {},
    detail: {},
}) {
    
    //loader
    const loader = createLoader("draco")
    const loadCar = async () => {
        return await loader.loadAsync(options.modelPath)
    }
    const gltf = await loadCar()
    const glbModel = gltf.scene.children[0]

    //enlarge 根据提供的放大尺寸来放大模型
    if (options.enlarge) {
        const box = new Box3().setFromObject(gltf.scene)
        const x = box.max.x - box.min.x
        const y = box.max.y - box.min.y
        const z = box.max.z - box.min.z
        glbModel.maxSize = Math.max(x, y, z)
        const enlarge = Number((options.enlarge / glbModel.maxSize).toFixed(3))
        glbModel.scale.set(enlarge, enlarge, enlarge)
    }

    // shadow 将提供的纹理贴图应用到模型上
    if (options.texturePath) {
        const { texturePath, carWidth, carLength } = options
        const shadow = new TextureLoader().load(texturePath)
        const mesh = new Mesh(
            new PlaneGeometry(carWidth, carLength),
            new MeshBasicMaterial({
                map: shadow, blending: MultiplyBlending, toneMapped: false, transparent: true
            })
        )
        mesh.rotation.x = - Math.PI / 2
        mesh.renderOrder = 2

        glbModel.add(mesh)
    }
    
    return glbModel
}

export { loadGlbModel }