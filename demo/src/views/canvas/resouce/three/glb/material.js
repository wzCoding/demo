import { MeshPhysicalMaterial, MeshStandardMaterial } from "three"

function createMaterial(type, options = {
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.5,
    transmission: 0,
    clearcoat: 0,
    clearcoatRoughness: 0
}) {
    
    let material

    switch (type) {
        case 'physical':
            material = new MeshPhysicalMaterial(options)
            break;
        case 'standard':
            material = new MeshStandardMaterial(options)
            break;
        default:
            material = null
            break;
    }

    return material
}

export { createMaterial }