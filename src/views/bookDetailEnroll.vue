<template>
    <div class = 'wrap'>
    <v-card>
        <v-card-title>
          <span class="headline">Input details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="책 이름"
                  required
                  disabled
                  
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="출판사"
                  required
                  disabled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="저자"
                  required
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="판매자 이름"
                  required
                  v-model="sellerName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="판매자 학번"
                  required
                  v-model="sellerNum"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                label='책 가격'
                required
                v-model="price">
                

                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select v-model="quality" label="quality"
                :items='grade'>
                  
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="moveTo"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="result">
        - 책 현황 -
        <!-- add html -->
        
        
       
      </div>
      </div>
</template>

<script>
import Data from '../Data/enroll'
export default {
  data() {
    return {
      data:Data,
      grade:['S','A','B','C'],
      sellerName:'',
      sellerNum:'',
      price:'',
      quality:'',
      
    }
  },
  methods: {
    moveTo() {
      this.sellerName='';
      this.sellerNum='';
      this.price='';
      this.quality='';

      this.$router.push({
        path:'/Manager',
      })
    },
    save() {
      var yes = confirm('입력하신 정보가 맞습니까?');
      if(yes == false) {
        alert('취소되었습니다.');
      }
      else {
        alert('등록되었습니다.');
        var resultHtml=document.createElement('div');
        var resultDiv = document.querySelector('.result');
        
        var text = this.sellerName + this.sellerNum + this.price + this.quality;
        resultHtml.innerHTML = text;
        resultDiv.appendChild(resultHtml);
      }
      
    }
  }
}
</script>


<style scoped>
    .wrap {
        /* background: red; */
        position: absolute;
        width:50%;
        height: 80%;
        left:25%;
        display:flex;
        justify-content: center;
        align-items: center;
        
    }
    .result {
      background:gray;
     position: absolute;
     display:flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width:100%;
     top:100%;
     

    }
    .resultHtml {
      background:red;
    }
</style>