import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { TextureLoader, MultiplyBlending, Mesh, PlaneGeometry, MeshBasicMaterial } from "three"
import { createCarMaterial } from "./material"
import { setWheels } from "./wheels"

const texturePath = "../static/texture/ferrari_ao.png"
const modelPath = "../static/models/ferrari.glb"
const dracoPath = "../static/draco/gltf/"

function loadCarModel(options = {
    carWidth: 2.5,
    carLength: 5.2,
    body: {},
    glass: {},
    detail: {},
}) {
    const shadow = new TextureLoader().load(texturePath)
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(dracoPath)

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    let carModel
    const { carWidth, carLength, body, glass, detail } = options

    const bodyMaterial = createCarMaterial('physical', body)
    const detailsMaterial = createCarMaterial('standard', detail)
    const glassMaterial = createCarMaterial('physical', glass)

    const a = loader.load(modelPath, function (gltf) {
        console.log(gltf)
        carModel = gltf.scene.children[0]

        carModel.getObjectByName('body').material = bodyMaterial

        carModel.getObjectByName('rim_fl').material = detailsMaterial
        carModel.getObjectByName('rim_fr').material = detailsMaterial
        carModel.getObjectByName('rim_rr').material = detailsMaterial
        carModel.getObjectByName('rim_rl').material = detailsMaterial
        carModel.getObjectByName('trim').material = detailsMaterial

        carModel.getObjectByName('glass').material = glassMaterial

        setWheels(carModel)

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
    },undefined, console.error)

    return a
}

export { loadCarModel }