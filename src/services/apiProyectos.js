import supabase from "./supabase";

export async function  getProyectos() {
    const { data, error } = await supabase
    .from('proyectos')
    .select('*');

    if(error){
        console.error('Los proyectos no han podido cargarse.')
    }
    
    return data;
}