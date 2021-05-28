// Pendiente:
// - agregar colores para los estados
// - agregar boton para filtrar
//  **esto ultimo agregar y hacer pruebas en un branch diferente

document.addEventListener("DOMContentLoaded", () => {
    obtenHabitaciones();
})

const obtenHabitaciones = async () => {
    try{
        fetch("api.json")
            .then(response => response.json())
            // .then(data => console.log(data));
            .then(data => {
                if(!data.length){
                    return
                }

                let table = new simpleDatatables.DataTable(".table", {
                    data: {
                        headings: Object.keys(data[0]),
                        data: data.map(item => Object.values(item)),
                    },
                    filters: {"tipo": ["Single", "Doble", "Suite"],
                            "estado": ["Disponible", "Ocupada", "Mantencion"],
                            "piso": ["1", "2", "3"]},
                    labels: {
                        placeholder: "Buscar...",
                        perPage: "{select} - Entradas por páginas",
                        info: "Mostrando {start} a {end} de {rows} entradas"
                    } 
                })
            });
        }catch (error){
            console.log(error);
        }
    }

const filterTableHabitaciones = () => {

}