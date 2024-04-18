export function getKeyByValueInMap(map: Map<String, any>, value: any, compare = (a: any, b: any) => a === b) {
    return Array.from(map.keys()).find((key) => compare(map.get(key), value))
}