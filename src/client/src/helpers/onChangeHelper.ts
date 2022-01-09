export default function onChangeHelper(e: any, setter: Function) {
    console.log(e.target)
    return setter(e.target.value)
}