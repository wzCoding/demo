import { TextureLoader, MultiplyBlending, Mesh, PlaneGeometry, MeshBasicMaterial } from "three"
import { createLoader } from "../components/loader"
import { createCarMaterial } from "./material"

const texturePath = "../static/texture/ferrari_ao.png"
const modelPath = "../static/models/ferrari.glb"

async function loadCarModel(options = {
    carWidth: 2.5,
    carLength: 5.2,
    body: {},
    glass: {},
    detail: {},
}) {
    const shadow = new TextureLoader().load(texturePath)
    const loader = createLoader("draco")

    const loadCar = async () => {
        return await loader.loadAsync(modelPath)
    }

    const { carWidth, carLength, body, glass, detail } = options

    const bodyMaterial = createCarMaterial('physical', body)
    const detailsMaterial = createCarMaterial('standard', detail)
    const glassMaterial = createCarMaterial('physical', glass)

    const gltf = await loadCar()
    const carModel = gltf.scene.children[0]

    carModel.getObjectByName('body').material = bodyMaterial

    carModel.getObjectByName('rim_fl').material = detailsMaterial
    carModel.getObjectByName('rim_fr').material = detailsMaterial
    carModel.getObjectByName('rim_rr').material = detailsMaterial
    carModel.getObjectByName('rim_rl').material = detailsMaterial
    carModel.getObjectByName('trim').material = detailsMaterial

    carModel.getObjectByName('glass').material = glassMaterial

    // shadow
    const mesh = new Mesh(
        new PlaneGeometry(carWidth, carLength),
        new MeshBasicMaterial({
            map: shadow, blending: MultiplyBlending, toneMapped: false, transparent: true
        })
    )
    mesh.rotation.x = - Math.PI / 2
    mesh.renderOrder = 2

    carModel.add(mesh)

    return carModel
}

export { loadCarModel }