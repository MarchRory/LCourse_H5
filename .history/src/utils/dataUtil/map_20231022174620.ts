export function getKeyByValueInMap(map: Map<String, any>, value: any, compare = (a: any, b: any) => a === b) {
    return Object.keys(map).find((key) => compare(map[key], value))
}