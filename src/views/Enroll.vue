<template>
    <div class = 'listContainer'>
        <!-- <div class="text-center">
    <v-btn rounded color="primary" dark @click="GoToEnroll">책 등록하기</v-btn>
  </div>
        <br> -->
        <bookList />
    </div>

</template>

<script>
import bookList from '../components/enroll/bookList';


export default {
    components : {
        bookList,
    },
    data() {
        return{
            
        }
    },
    methods: {
        GoToEnroll() {
            this.$router.push({
                path:'./bookEnroll'
            })
        }
    }
}
</script>

<style scoped>
    .listContainer {
        padding-top:5%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>