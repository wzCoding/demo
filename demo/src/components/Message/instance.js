const instances = []
const groupInstances = {};

const getIndex = (id) => {
    return instances.findIndex((el) => el.id == id);
}
const getInstance = (id) => {
    let current, next;
    const index = getIndex(id);
    if (index != -1) {
        current = instances[index];
        next = instances[index + 1] ? instances[index + 1] : null;
    }
    return { current, next }
}
const removeInstance = (id) => {
    if(!id) return;
    const index = getIndex(id);
    instances.splice(index, 1);
}
const removeGroupInstance = (key) =>{
    if(!key) return;
    if(groupInstances[key]){
        delete groupInstances[key];
    }
}
export {
    instances,
    groupInstances,
    getIndex,
    getInstance,
    removeInstance,
    removeGroupInstance
}
