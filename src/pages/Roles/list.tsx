import { Eye, Edit, Trash2 } from "lucide-react"; // Es la libreria de los Iconos bonitos
import { useState, useEffect } from "react"; 

import { roleService } from "../../services/roleService"; // Se esta solicitando al acceso de datos, para cargar la API
import Swal from "sweetalert2"; // Hace que salgan las aletras bonitas, como animadas
import { Role } from "../../models/Role"; // Se coge el modelo


const ListRoles = () => {


    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Role[]>([]);

    // 🔹 Llamar `fetchData` cuando el componente se monta
    useEffect(() => { // useEffect es el metodo que se utiliza cuando se carga la pagina
        fetchData(); // Este saca la información
    }, []);

    // 🔹 Obtiene los datos de los usuarios
    const fetchData = async () => {  
        const data = await roleService.getRole(); // Se va al backend
        setData(data); // Actualiza la variable reactiva data
    };



    // Funciones para manejar las acciones
    const handleView = (id: number) => {
        console.log(`Ver registro con ID: ${id}`);

    };

    const handleEdit = (id: number) => {
        console.log(`Editar registro con ID: ${id}`);

        // Lógica para editar el registro
    };

    const handleDelete = async (id: number) => {
        console.log(`Intentando eliminar role con ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await roleService.deleteRole(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El registro se ha eliminado",
                        icon: "success"
                    });
                }
                // 🔹 Vuelve a obtener los usuarios después de eliminar uno
                fetchData();
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => ( // El .map es un mapeo que parece un ciclo for, que recorre elemento por elemento de la lista
                                        <tr key={item.id} className="odd:bg-whiteodd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                            <td className="px-6 py-4">{item.description}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => handleView(item.id ? item.id : 0)}
                                                    className="text-blue-600 dark:text-blue-500"
                                                >
                                                    <Eye size={20} /> {/* Ícono de ver */}
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleEdit(item.id)}
                                                    className="text-yellow-600 dark:text-yellow-500"
                                                >
                                                    <Edit size={20} /> {/* Ícono de editar */}
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleDelete(item.id)}
                                                    className="text-red-600 dark:text-red-500"
                                                >
                                                    <Trash2 size={20} /> {/* Ícono de eliminar */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ListRoles;
