export function getKeyByValueInMap(map: Map<string, any>, value: any, compare = (a: any, b: any) => a === b) {
    return Object.keys(map).find((key) => compare(map.get(key), value))
}