import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

//Si tareas existe entonces tomamos su id con los datos personalizados (data)
if(tareas){

    tareas.addEventListener('click', e =>{
        
        if(e.target.classList.contains('fa-check-circle')){
            //con parentElement subimos de nivel para obtener el id
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then((respuesta)=>{
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                    
                        actualizarAvance();
                    }

                    
                })
        } 

        if(e.target.classList.contains('fa-trash')){
            //Obtenemos el ID de la tarea a eliminar
            const tareaHtml = e.target.parentElement.parentElement,
                  idTarea = tareaHtml.dataset.tarea;

                  Swal.fire({
                    title: '¿Estas seguro de borrar la Tarea?',
                    text: "Esta acción no se puede revertir",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar',
                    cancelButtonText: 'No, cancelar',
                })
                .then((result)=>{
                    if(result.isConfirmed){
                        const url = `${location.origin}/tareas/${idTarea}`;

                        //Eliminar tarea por medio de Axios
                        axios.delete(url, {params: {idTarea}})
                            .then((respuesta)=>{
                                if(respuesta.status === 200){

                                //Eliminar el nodo
                                tareaHtml.parentElement.removeChild(tareaHtml);

                                //Una alerta de eliminación
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )

                                actualizarAvance();
                            }
                            })

                    }
                })
        
            }
})
}
        

export default tareas; 