/**
 * 
 * @param e - get id and value of element
 * @param setter - useState setter
 */
export default function onChangeForInterfaces(e: any, setter: Function) {
  const { id, value } = e.target;
  setter((prevState: any) => ({
    ...prevState,
    [id]: value,
  }));
}
