<template>
    <div class = 'wrap'>
    <form class = 'form-field'>
    <v-text-field
      v-model="title"
      label="책 제목"
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
      title:"",
      publisher:"",
      author:"",
    }
  },
    methods: {
      submit () {
        this.axios.post('https://us-central1-kit-fleamarket.cloudfunctions.net/admin/books', {
          "title":this.title,
          "publisher":this.publisher,
          "auther":this.author
        }).then(()=>{
          alert(this.title+'\n' + this.publisher + '\n' + this.author + '\n' + '등록되었습니다.');
          this.$router.push({
          path:"./Manager"
        })
      }).catch((err) => {
        console.log(err);
      })
        
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
v-text-field {
  margin-bottom:100px;
}
</style>

