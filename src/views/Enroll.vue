<template>
    <div class = 'listContainer'>
        <div class="text-center">
    <v-btn rounded color="primary" dark ><a href="/bookenroll">책 등록하기 </a></v-btn>
  </div>
        <br>
        <bookList />
    </div>

</template>

<script>
import bookList from '../components/enroll/bookList';


export default {
    components : {
        bookList,
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