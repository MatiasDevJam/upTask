import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        //recuperamos el valor de data agreado en la vista de tareas
        const urlProyecto = e.target.dataset.proyectoUrl;

        //console.log(urlProyecto);

        Swal.fire({
            title: '¿Estas seguro de borrar el Proyecto?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                //eliminar proyecto con axios
                axios.delete(url, { params: { urlProyecto } })
                    .then((respuesta) => {
                        console.log(respuesta);
                        Swal.fire(
                            '¡Proyecto eliminado!',
                            respuesta.data,
                            'success'
                        );

                        // Redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            icon: 'error',
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se puedo eliminar el proyecto'
                        })
                    })
            }
        })
    })
}

export default btnEliminar; 
