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
                            "piso": ["1", "2", "3"]}
                })
            });
        }catch (error){
            console.log(error);
        }
    }

const filterTableHabitaciones = () => {

}