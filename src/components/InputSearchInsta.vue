

<template>

    <div class="input-search-instagram">

        <div class="input-search-instagram-input">
            <input type="text" placeholder="Nombre de la cuenta de instagram" @input="inputSearch" autocomplete="off">
            <i v-if="isLoading" class="el-icon-loading"></i>
            <span>BUSCAR</span>
        </div>

        <div class="input-search-instagram-list" v-if="name_instagram.length > 0" >

            <div
                class="instagram-list-item"
                v-for="perfil in perfilListFilter" 
                :key="perfil.pk">

                <div class="instagram-list-item-image"><img :src="perfil.profile_pic_url" alt=""></div>

                <div class="instagram-list-item-names">
                    <p class="text-username">@{{perfil.username}}</p>
                    <p class="text-name">{{perfil.full_name}}</p>
                </div>

                <div class="instagram-list-item-numbers">{{perfil.byline}}</div>

                <div class="instagram-list-item-btn" @click="selectPerfil(perfil.pk)" >AGREGAR</div>

            </div>

        </div>

    </div>
 
</template>

<script>

    import instagram from '../../services/instagram'

    export default {
        data(){
            return {
                name_instagram: '',
                perfilSelect: null,
                perfilList:[],
                searchMemo:[],
                isLoading: false
            }
        },
        methods:{
            selectPerfil(id){

                this.$emit("selectPerfil", id);
                this.name_instagram = ''

            },
            async inputSearch(evt){

                try{

                    this.name_instagram = evt.target.value
                    
                    if(this.name_instagram.length < 3) return 0

                    if(this.searchMemo.indexOf(this.name_instagram) != -1) return null

                    this.isLoading = true

                    this.searchMemo.push(this.name_instagram)

                    const perfilList = this.perfilList.concat( ( await instagram.searchPerfil(this.name_instagram) ) )

                    this.perfilList = this.uniqByProp_map(perfilList);

                    this.isLoading = false

                }catch(e){

                    console.log( e.message )

                    throw e
                    
                }

            },

            uniqByProp_map(arr){

                return Array.from(
                    arr
                    .reduce((acc, item) => ( item && item['pk'] && acc.set(item['pk'], item), acc), new Map() )
                    .values()
                )

            }

        },
        computed:{
            perfilListFilter() {
                return this.perfilList.filter(perfil => {
                    return perfil.username.toLowerCase().startsWith(this.name_instagram.toLowerCase())
                }).slice(0, 5)
            }
        }
    }



</script>


<style lang="scss">

    @import "../scss/colors.scss";

    .input-search-instagram{
        position: relative;
    }

    .input-search-instagram-input{
        display: flex;
        justify-content: center;
        align-items: center;
        background: $color-rosa-1;
        border-radius: 5px;
        position: relative;

        .el-icon-loading{
            position: absolute;
            right: 123px;
            font-size: 26px;
            color: #144b5a;
        }
        
    }
    
    .input-search-instagram-input input{
        background-image: none;
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        color: white;
        display: inline-block;
        font-size: inherit;
        height: 50px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        width: 100%;
        background: $color-azul-0;
        border: solid 1px #ea2a64;

        &::placeholder { 
            color: white;
            opacity: .5;
        }
    }

    .input-search-instagram-input span{
        color: #fff;
        padding: 0 20px;
        line-height: 46px;
        font-size: 16px;
        font-weight: 700;
        transition: background-color .2s ease-in;

        @media only screen and (max-width: 700px) {
            display: none;
        }

    }

    .input-search-instagram-list{
        position: absolute;
        z-index: 1;
        background: #0e1c40;
        width: 100%;
        margin-top: 10px;

    }

    .instagram-list-item{
        display: grid;
        grid-template-columns: auto 1fr 1fr auto;
        align-items: center;
        grid-template-rows: auto;
        grid-column-gap: 20px;
        border-bottom: solid 1px #00000017;
        height: 100px;
        color: white;
        font-size: 21px;

        @media only screen and (max-width: 999px) {
            grid-template-columns: auto minmax(100px, 1500px) 1fr;
            font-size: 15px;
            grid-column-gap: 10px;
        }

        &:hover{
            cursor: pointer;
            z-index: 6;
            position: relative;
            user-select: none;
            background: #314467;
        }

        .instagram-list-item-image{
            height: 100px;
            padding: 10px;

            @media only screen and (max-width: 700px) {
                height: 70px;
            }

            img{
                border-radius: 50%;
                height: 100%;
                object-fit: cover;
            }
        }

        .instagram-list-item-names{

            .text-username{
                // font-size: 18px;
                margin: 5px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .text-name{
                font-size: 15px;
                margin: 5px 0;
                opacity: .5;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 300;
            }

        }

        .instagram-list-item-numbers{
            color: #ffb020;

            @media only screen and (max-width: 999px) {
                display: none;
            }

        }

        .instagram-list-item-btn{
            background: #00c6fe;
            padding: 8px 10px;
            border-radius: 3px;
            margin: 20px;
            font-size: 16px;
            font-weight: 700;
            line-height: 15px;

            &:hover{
                background: #00c6feba;
            }

        }

    }

    .icon{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #00000057;
    }

    .input-search-instagram p{
        margin: 0;
    }

    .perfil-select{
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: auto;
        padding: 10px;
        margin: 20px 0;
        border: solid 1px #ff6436;
        border-radius: 4px;
    }

    .perfil-select img {
        max-width: 50;
        max-height: 50;
        width: 100%;
        margin: 0 auto;
        border-radius: 50%;
    }

    .perfil-select .el-icon-success{
        color: #4CAF50;
    }

</style>
