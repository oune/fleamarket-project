<template>
    <div class = 'wrap'>
    <form class = 'form-field'>
    <v-text-field
      v-model="name"
      label="이름"
      required
    ></v-text-field>
    <v-text-field
      v-model="publisher"
      label="출판사"
      required
    ></v-text-field>
    <v-text-field
      v-model="author"
      label="저자"
      required
    ></v-text-field>
    <div class = 'button-field'>
    <v-btn
      class="mr-4"
      @click="submit"
    >
      글쓰기
    </v-btn>
    </div>
  </form>
    </div>
</template>

<script>
import Data from '../Data/enroll'
export default {
  data() {
    return {
      data:Data,
      name:"",
      publisher:"",
      author:"",
    }
  },
    methods: {
      submit () {
        this.data.push({
          name: this.name,
          publisher: this.publisher,
          author: this.author,
        })
        this.$router.push({
          path:"./Manager"
        })
        alert(this.autor);
      },
    },
}
</script>

<style scoped>
.wrap {
    position: absolute;
    left:25%;
    top:25%;
    height:80%;
    width:50%;
}
.form-field {
    position: absolute;
    background:#fafafa;
    width:100%;
    height:50%;
}
.button-field {
    position: absolute;
    /* background:red; */
    display:flex;
    justify-content: center;
    width:100%;
    top:100%
}
</style>

