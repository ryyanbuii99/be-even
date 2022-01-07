export default function onChangeHelper(e: any, setter: Function) {
    console.log(e.target.value)
    return setter(e.target.value)
}