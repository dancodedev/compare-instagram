

<template>

    <div class="compare-perfil">

        <div class="grid-perfil">

            <div class="grid-perfil-item" v-for="perfil in perfiles" :key="perfil.pk">

                <div class="grid-perfil-item__image">
                    <img :src="perfil.profile_pic_url" alt="">
                </div>

                <div class="grid-perfil-item__text grid-perfil-item__text--name">{{perfil.full_name}}</div>

                <div 
                    class="grid-perfil-item__text" 
                    v-bind:class="{ 'grid-perfil-item__text--rank': perfil.follower_count_rank }">
                    {{perfil.follower_count}}
                    <span>seguidores</span>
                </div>

                <div 
                    class="grid-perfil-item__text" 
                    v-bind:class="{ 'grid-perfil-item__text--rank': perfil.following_count_rank }">
                    {{perfil.following_count}}
                    <span>seguidos</span>
                </div>

                <div 
                    class="grid-perfil-item__text" 
                    v-bind:class="{ 'grid-perfil-item__text--rank': perfil.media_count_rank }">
                    {{perfil.media_count}}
                    <span>publicaciones</span>
                </div>

                <div 
                    class="grid-perfil-item__text" 
                    v-bind:class="{ 'grid-perfil-item__text--rank': perfil.usertags_count_rank }">
                    {{perfil.usertags_count}}
                    <span>Tags</span>
                </div>
                 
            </div>
 
        </div>

    </div>
 
</template>

<script>

    export default {
        props: ['perfiles'],
        data(){
            return {
                
            }
        },
        methods:{
 

        },
        computed:{
           
        }
    }



</script>


<style lang="scss" scope>

    @import "../scss/colors.scss";

    .compare-perfil{
        margin: 60px 0;
    }

    .grid-perfil{
        display:grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        justify-items: stretch;
        grid-gap: 10px;

        @media only screen and (max-width: 500px) {
           grid-column-gap: 5px;
        }
    
        .grid-perfil-item{
            background: #0e1c40;
            // max-width: 300px;

            .grid-perfil-item__image{
                text-align: center;
                background: #16274d;
                padding: 10px;

                img{
                    border-radius: 50%;
                    width: 40%;
                    min-width: 100px;
                    max-width: 200px;
                    object-fit: cover;
                    border: solid 3px #ea2a64;
                    padding: 5px;
                }

            }

            .grid-perfil-item__text {
                // margin: 15px;
                padding: 15px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;

                @media only screen and (max-width: 500px) {
                    font-size: 13px;
                    padding: 10px 5px;
                }

                span{
                    font-size: 13px;
                    opacity: 0.5;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    @media only screen and (max-width: 500px) {
                        font-size: 11px;
                    }

                }

                &.grid-perfil-item__text--name{
                    color: #ffb020;
                    font-weight: 700;
                    display: block;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                &.grid-perfil-item__text--rank{
                    color: #ea2a64;
                    font-weight: 700;

                    span{
                        font-size: 13px;

                    }

                }

                

            }
            

        }

    }

</style>
