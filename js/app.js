const formTipoHab = document.getElementById('form-tipoHab');
const btnPiso = document.getElementById('btn-pisos');
const templateHabitacion = document.getElementById('template-habitacion').content;
const listaHabitaciones = document.getElementById('lista-habitaciones');
const btnHabitacion = document.getElementById('btn-habitacion');
const fragment = document.createDocumentFragment();

let piso = 1;
let tipoHabitacion = "Single";


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("single").checked = true;
    obtenfetchData(tipoHabitacion,piso);
})


formTipoHab.addEventListener("click", e => {
    // console.log(e.target.id);
    agregaTipoHab(e);
})

btnPiso.addEventListener('click', e => {
    agregaPiso(e);
})


const agregaTipoHab = e => {
    if(e.target.id === "single"){
        tipoHabitacion = "Single";
        obtenfetchData(tipoHabitacion, piso);
    }else if(e.target.id === "doble"){
        tipoHabitacion = "Doble";
        obtenfetchData(tipoHabitacion, piso);
    }else if(e.target.id === "suite"){
        tipoHabitacion = "Suite";
        obtenfetchData(tipoHabitacion, piso);
    }

    e.stopPropagation();
}


const agregaPiso = (e) => {
    if(e.target.id === "piso-1"){
        piso = 1;
        obtenfetchData(tipoHabitacion, piso);
    }else if(e.target.id === "piso-2"){
        piso = 2;
        obtenfetchData(tipoHabitacion, piso);
    }else if(e.target.id === "piso-3"){
        piso = 3;
        obtenfetchData(tipoHabitacion, piso);
    }
    modificaBtnPiso(piso);
    e.stopPropagation();
}

const modificaBtnPiso = piso => {
    const btnSeleccionado = btnPiso.children;
    for (let i = 0; i < btnSeleccionado.length; i++) {
        if(btnSeleccionado[i].id === `piso-${piso}`){
            btnSeleccionado[i].classList.add("piso--selected")
        }else{
            btnSeleccionado[i].classList.remove("piso--selected")
        }
    }
}


const obtenfetchData = async (tipoHabitacion, piso) => {
    try{
        const res = await fetch("api.json");
        const data = await res.json();
        pintarHabitaciones(data, tipoHabitacion, piso);
    }catch(error){
        console.log(error);
    }
}

const pintarHabitaciones = (habitaciones, tipoHabitacion, pisoSelected) => {
    listaHabitaciones.innerHTML = "";
    const dataFiltrada = habitaciones.filter(habitacion => {
        return habitacion.tipo === tipoHabitacion;
    })
    const dataFiltradaPiso = dataFiltrada.filter(habitacion => {
        return habitacion.piso == pisoSelected;
    })

    dataFiltradaPiso.forEach(habitacion => {
        const clone = templateHabitacion.cloneNode(true);
        clone.getElementById("num-habitacion").innerHTML = `Habitación ${habitacion.numero}`;
        clone.getElementById("tipo-habitacion").textContent = habitacion.tipo;
        if(habitacion.estado === "Disponible"){
            clone.querySelector(".habitacion").classList.replace('habitacion--free', 'habitacion--free');
        }else if(habitacion.estado === "Ocupada"){
            clone.querySelector('.habitacion').classList.replace('habitacion--free', 'habitacion--occupied');
            clone.getElementById('btn-habitacion').style.display = "none";
        }else{
            clone.querySelector('.habitacion').classList.replace('habitacion--free', 'habitacion--maintenance');
            clone.getElementById('btn-habitacion').style.display = "none";
        }
        fragment.appendChild(clone);
    })

    listaHabitaciones.appendChild(fragment);
}