import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AlertClient = withReactContent(Swal);

//Mensajes y Titulos definidos succes | error | confirm

//Success
export const customAlertSuccess = (title, text, icon) => {
    return AlertClient.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#3085D6',
        confirmButtonText: 'Aceptar'
    })
}

export const customAlertError = (title, text, icon) => {
    return AlertClient.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#3085D6',
        confirmButtonText: 'Aceptar'
    })
}
export const customAlertConfirm = (title, text, icon) => {
    return AlertClient.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#3085D6',
        confirmButtonText: 'Aceptar',
    })
}