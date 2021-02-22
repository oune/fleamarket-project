<template>
    <div class = 'wrap'>
        <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            name
          </th>
          <th class="text-left">
            publisher
          </th>
          <th class = 'text-left'>
            author
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key='index' v-for='(value, index) in data'
          @click="moveToDetail"
        >
          <td>{{ value.name }}</td>
          <td>{{ value.publisher }}</td>
          <td>{{ value.author }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
</template>


<script>
import Data from '../../Data/enroll'
  export default {
    data () {
      return {
        data:Data,
      }
    },
     methods: {
       moveToDetail() {
         this.$router.push({
           path:"./detailEnroll"
         })
       }
    }
  }
   

</script>

<style scoped>
  td {
    text-align: center;
  }
</style>