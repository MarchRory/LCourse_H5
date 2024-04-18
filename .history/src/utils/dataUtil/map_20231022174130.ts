export function getKeyByValueInMap(map: Map<String, any>, value: any, compare = (a: any, b: any) => a === b) {
    Object.keys(map).find((key) => {
        return compare(map.get(key), value)
    })
    return Object.keys(map).find((key) => compare(map.get(key), value))
}