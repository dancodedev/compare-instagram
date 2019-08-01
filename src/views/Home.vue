
<template>

    <div class="home">

        <div class="content">

            <h1 class="text-h1">Comparador Instagram</h1>

            <input-search-insta @selectPerfil="selectPerfil" ></input-search-insta>

            <compare-perfil :perfiles="perfilesSelected"></compare-perfil>

        </div>

    </div>

</template>

<script>

import InputSearchInsta from '@/components/InputSearchInsta'
import ComparePerfil from '@/components/ComparePerfil'

import instagram from '../../services/instagram'

export default {
    name: 'home',
    components: {
        InputSearchInsta, ComparePerfil
    },
    data(){
        return{
            perfiles: [],
            perfilesSelected: []
        }
    },
    methods:{
        async searchPerfil(){

            this.perfiles = await instagram.searchPerfil('danhanfry')

        },

        async selectPerfil(id){

            const perfilInfo = await instagram.getInfoPerfilById(id)

            this.perfilesSelected.push(perfilInfo)
         
            for (let index in this.perfilesSelected) {

                if(getRankNumber(this.perfilesSelected, 'follower_count').pk == this.perfilesSelected[index].pk){
                    this.perfilesSelected[index].follower_count_rank = true
                }else{ 
                    this.perfilesSelected[index].follower_count_rank = false
                }

                if(getRankNumber(this.perfilesSelected, 'following_count').pk == this.perfilesSelected[index].pk){
                    this.perfilesSelected[index].following_count_rank = true
                }else{ 
                    this.perfilesSelected[index].following_count_rank = false
                }
                

                if(getRankNumber(this.perfilesSelected, 'usertags_count').pk == this.perfilesSelected[index].pk){
                    this.perfilesSelected[index].usertags_count_rank = true
                }else{ 
                    this.perfilesSelected[index].usertags_count_rank = false
                }
                

                if(getRankNumber(this.perfilesSelected, 'media_count').pk == this.perfilesSelected[index].pk){
                    this.perfilesSelected[index].media_count_rank = true
                }else{ 
                    this.perfilesSelected[index].media_count_rank = false
                }
                
            }
            
        }

    }, 
    computed:{

    }

}

function getRankNumber(arr, key){

    return arr.sort( (a, b) => b[key] - a[key] )[0]

}

</script>


<style lang="scss" scope>

    @import "../scss/colors.scss";

    body{
        background-image: -webkit-gradient(linear, left top, right top, from(#151d33), color-stop(#3b1839), color-stop(#151d33), color-stop(#3b1839), to(#3b1839));
        background-image: linear-gradient(to right, #151d33, #3b1839, #151d33, #3b1839, #3b1839);
        background-size: 600%;
        background-position: 0 0;
        box-shadow: inset 0 0 5em rgba(0, 0, 0, 0.5);
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

    .home{
        width: 100vw;
        overflow: auto;
    }

    .text-h1{
        font-weight: 700;
        background: linear-gradient(100deg, #ffb020 46%, #ffffff 58%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        font-size: 6vw;
        margin-bottom: 60px;

        @media only screen and (max-width: 1050px) {
            font-size: 5vw;
            margin-bottom: 30px;
        }

    }

    
    .content{
        width: 80%;
        margin: auto;
        position: relative;
        z-index: 1;
        height: 100vh;
        padding: 60px;

        @media only screen and (max-width: 600px) {
            width: 95%;
            padding: 60px 10px;
        }

        @media only screen and (max-width: 500px) {
            width: 100%;
            padding: 60px 5px;
        }


    }


</style>
