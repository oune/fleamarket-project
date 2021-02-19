<template>
    <div class = 'wrap'>
        <v-data-table
            :headers="headers"
            :items="books"
            :sort-by="['Name', 'Publisher']"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
            @click:row="moveToDetail"
  ></v-data-table>
    </div>
</template>


<script>
import EventBus from '../enroll/EventBus';
  export default {
    
    data () {
      return {
        headers: [
          {
            text:'Name',
            value:'name',
          },
          // { text: 'Name', value: 'name' },
          { text: 'Publisher', value: 'publisher' },
          { text: 'Writer', value: 'writer' },
        ],
        books: [
          {
            name: '대학수학',
            publisher: '수학자들의모임',
            writer: '아리스토텔레스'
          },
          {
            name: '대학물리',
            publisher: '물리학자들의 모임',
            writer: '나는물리학자',
          },
          {
            name: '리스닝잉글리시',
            publisher: '원어민들의 모임',
            writer: '원어민',
          },
          {
            name: '리딩잉글리시',
            publisher: '원어민들의 모임',
            writer: '원어민',
          },
          {
            name: 'C언어',
            publisher: '열혈',
            writer: '윤성우',
          },
          {
            name: 'Java',
            publisher: '커피먹고싶다',
            writer: '자바칩프라푸치노',
          },
          {
            name: '아이고 힘들어',
            publisher: '힘든사람들의 모임',
            writer: '힘든자',
          },
          {
            name: 'Vuejs',
            publisher: '처음써보는사람',
            writer: '나',
          },
          {
            name: '눈누난나',
            publisher: '제시회사',
            writer: '제시',
          },
          {
            name: '트롯트가좋아요',
            publisher: '그래요?',
            writer: '네',
          },
          {
            name: '노가다 힘들어',
            publisher: '노가다',
            writer: '막노동',
          },
          {
            name: '먹고살기힘드네요',
            publisher: '힘을내요',
            writer: '감사합니다',
          },
          
        ],
        rowdata: [
          {
            rowname:'',
            rowpublisher:'',
            rowwriter:'',
          }
        ],
      }
    },
    methods: {
       moveToDetail(row) {
         location.href='/detailenroll';
         this.rowdata.rowname = row.name;
         this.rowdata.rowpublisher = row.publisher;
         this.rowdata.rowwriter = row.writer;
         EventBus.$emit('rowData',row.name);
         console.log(this.rowdata.rowpublisher);
       }
    }
  }

</script>

<style scoped>

</style>