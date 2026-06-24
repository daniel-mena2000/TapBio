//Utilidad para HeadlesUI boton de Swtich
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

//Funcion para validar si es una URL en el input gracias a  new URL(url)
export function isValidUrl(url: string) {
    try {
        new URL(url)
        return true
    } catch{
        return false
    }
}
