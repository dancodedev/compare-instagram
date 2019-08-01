
import axios from 'axios'

export default { searchPerfil, getInfoPerfilById }

// Buscamos usuarios en instagram
async function searchPerfil(perfilName){

    try{

        const uri =  `https://www.instagram.com/web/search/topsearch/?context=user&query=${perfilName}&rank_token=0.14919487437657386&include_reel=true`

        const get = await axios.get(uri)

        const user = searchPerfilFilter(get)

        return user

    }catch(e){
       
        console.log('[e][searchPerfil]', e.message)

        throw e

    }

}


// Consulta la información basica mediante un id de perfil
async function getInfoPerfilById(id){

    try{

        const uri = `https://i.instagram.com/api/v1/users/${id}/info/`

        const get = await axios.get(uri)

        const user = getInfoPerfilByIdFilter(get)

        return user
    
    }catch(e){

        console.log('[e][getInfoPerfilById]', e.message)

        throw e

    }

}



// Validamos que hemos encontrado usuarios y eliminamos perfiles privados
function searchPerfilFilter(get){

    if(!get || !get.data || !get.data.users || !get.data.users.legnth <= 0) return []

    return get.data.users.filter( user => !user.user.is_private ).map( user => user.user )

}


// Se comprueba que existan los datos y devolvemos
function getInfoPerfilByIdFilter(get){

    if(!get || !get.data || !get.data.user) return []

    return get.data.user

}
