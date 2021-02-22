<template>
    <div class = 'wrap'>
        <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">
            title
          </th>
          <th class="text-left">
            publisher
          </th>
          <th class = 'text-left'>
            author
          </th>
          <th class = 'text-left'>
            stocks
          </th>
          
          <th class = 'text-left'>
          
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key='index' v-for='(value, index) in info.data'
          @click="moveToDetail"
        >
          <td>{{ value.title }}</td>
          <td>{{ value.publisher }}</td>
          <td>{{ value.auther }}</td>
          <td>{{ value.stockCount }}</td>
          <td><v-btn class='deleteBtn' @click='bookDel'>삭제</v-btn></td>
          
        </tr>
      </tbody>
  </v-simple-table>
    </div>
</template>


<script>
import Data from '../../Data/enroll'
  export default {
    data () {
      return {
        info:Data,
        tempID : '',
      }
    },
    created() {
       this.axios.get('https://us-central1-kit-fleamarket.cloudfunctions.net/books').then((res) => {
        this.info.data = res.data;
       })
    },
     methods: {
       moveToDetail(e) {
         var test = e.target.nodeName;
         if(test == 'TD') {
           this.$router.push({
           path:"./detailEnroll"
         })
        }
        //  console.log(test);
         
       },
       bookDel(e) {
         var deleteBtn = e.target
         var titleText = deleteBtn.parentNode.parentNode.parentNode.firstChild.textContent;
        //  console.log(deleteBtn.parentNode);
         console.log(titleText);
         var yes = confirm('정말 삭제하시겠습니까?');
         if(yes === true) {
           for(var i=0; i<this.info.data.length; i++) {
             console.log(this.info.data[i].title);
          if(this.info.data[i].title === titleText) {
            this.tempID = this.info.data[i].id;
            break;
          }
         }
         console.log(this.tempID);
         this.axios.delete('https://us-central1-kit-fleamarket.cloudfunctions.net/admin/books/' + this.tempID)
         .then(()=>{
           
           alert('삭제되었습니다.');
           this.tempID='';
           location.reload();
         })
         .catch((err)=> {
           alert('새로고침 후 다시 시도해주세요.');
           console.log(err);
         })
         }
       }
    }
  }
   

</script>

<style scoped>
  td {
    text-align: center;
  }
</style>