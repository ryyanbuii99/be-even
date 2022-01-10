export default function onChangeHelper(e: any, setter: Function) {
    return setter(e.target.value)
}