export function getKeyByValueInMap(map: Map<String, any>, value: any, compare = (a: any, b: any) => a === b) {
    console.log(value)
    return Array.from(map.keys()).find((key) => {
        console.log(key)
        return compare(map.get(key), value)
    })
}