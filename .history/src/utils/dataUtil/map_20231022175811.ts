export function getKeyByValueInMap(map: Map<String, any>, value: any, compare = (a: any, b: any) => a === b) {
    return Array.from(map.keys()).find((key) => {
        console.log(key)
        console.log(compare(map.get(key), value))
        return compare(map.get(key), value)
    })
}