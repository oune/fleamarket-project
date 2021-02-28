<template>
    <div class = 'listContainer'>
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