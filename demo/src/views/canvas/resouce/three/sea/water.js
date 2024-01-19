import { Water } from "three/examples/jsm/objects/Water.js";
import { PlaneGeometry, Vector3, TextureLoader, RepeatWrapping } from "three"

const texturePath = "../static/texture/waternormals.jpg"

function setWater(options = {
    seaWidth: 10000,
    seaHeight: 10000,
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    waterSpeed: 0.01,
    distortionScale: 3.7,
    fog: true,
}) {
    const waterGeometry = new PlaneGeometry(options.seaWidth, options.seaHeight);
    const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new TextureLoader().load(texturePath, function (texture) {
            texture.wrapS = texture.wrapT = RepeatWrapping;
        }),
        sunDirection: new Vector3(),
        sunColor: options.sunColor,
        waterColor: options.waterColor,
        distortionScale: options.distortionScale,
        fog: options.fog,
    });

    water.rotation.x = - Math.PI / 2;

    water.tick = () => {
        water.material.uniforms['time'].value += options.waterSpeed;
    }
    return water
}

export { setWater }