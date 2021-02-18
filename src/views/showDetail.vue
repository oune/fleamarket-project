<template>
  <v-container>
    <!-- 책이름, 저자,출판사, 검색 -->
    <v-row>
      <v-col cols="12">
        <v-card class="cover">
          <v-card-title>
            <v-col offset="1" cols="3"> 책이름 </v-col>
            <v-col>
              <h3>{{ this.test }}</h3>
            </v-col>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-title>
            <v-col offset="1" cols="3"> 저자 </v-col>
            <v-col>
              <h3>{{ this.test }}</h3>
            </v-col>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-title>
            <v-col offset="1" cols="3"> 출판사 </v-col>
            <v-col>
              <h3>{{ this.test }}</h3>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- 등록되어 있는 책 목록 -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title
            >책 목록
            <v-spacer></v-spacer>

            <v-text-field
              class="serchTextField"
              v-model="searchBooks"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="bookHeaders"
            :items="books"
            :search="searchBooks"
            class="table"
            mobile-breakpoint="0"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- 예약자 명단 -->
    <v-row>
      <v-col>
        <v-card>
          <!-- 예약자 명단 테이블 -->
          <v-data-table
            :headers="userHeaders"
            :items="users"
            sort-by="name"
            class="elevation-1"
            mobile-breakpoint="0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title></v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <!-- 예약 버튼 -->
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      예약하기
                    </v-btn>
                  </template>

                  <!-- Dialog -->
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <!-- 신규 예약시 작성 요소 -->
                    <!-- 날짜, 시간, 이름, 학번, 비밀번호 -->
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="이름"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.studentNum"
                              label="학번"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-date-picker
                              color="rgb(80, 130, 155)"
                              v-model="date"
                              no-title
                              scrollable
                            >
                            </v-date-picker>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              v-model="date"
                              label="예약 날짜(선택)"
                              readonly
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.time"
                              label="예약 시간"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="비밀번호"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- 삭제(본인만 가능하도록) -->
                <!-- 삭제시 학번, 비밀번호 요구. 선택된 예약과 학번, 비밀번호가 맞으면 예약 삭제 -->
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-container>
                      <v-row>
                        <v-col cols="6"></v-col>
                        <v-col cols="6"></v-col>
                      </v-row>
                    </v-container>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchBooks: "",
      searchUsers: "",
      bookHeaders: [
        {
          text: "판매가격",
          align: "start",
          sortable: true,
          value: "price",
        },
        { text: "책상태", value: "grade" },
        { text: "판수", value: "edit" },
      ],

      userHeaders: [
        {
          text: "이름",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "학번", value: "studentNum" },
        { text: "날짜", value: "day" },
        { text: "시간", value: "time" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      //   책목록 배열
      books: [],

      //   예약자 목록 배열
      users: [],
      test: "가나다라",

      //예약 기능 관련
      date: "",
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        studentNum: 0,
        day: 0,
        time: 0,
      },
      defaultItem: {
        name: "",
        studentNum: "",
        day: "",
        time: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "신규 예약" : "예약 수정";
    },

    //달력 선택 날짜 결과 문자열 변환 yyyy-mm-dd -> mm/dd
    dateStringSlice() {
      return this.date.slice(5, 7) + "/" + this.date.slice(8, 10);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // api 연결
  beforeMount() {},

  //테이블 초기화.
  created() {
    this.initialize();
  },

  methods: {
    //필요 예외처리
    /*

        입력 형태가 일치하는지, 요구 입력이 모두 있는지.
        삭제, 수정할때 학번, 비밀번호가 일치 하는지
        신규 에약시 등록되어 있는 책의 수를 넘어가는지(4권이 등록 되어있으면 4명 까지만 에약 가능)
        날짜 예외 처리(현재 보다 이전 선택 X)

      */

    //테이블 아이템 설정
    initialize() {
      this.books = [
        {
          price: 3000,
          grade: "C",
          edit: 4,
        },
        {
          price: 5000,
          grade: "B",
          edit: 2,
        },
        {
          price: 8000,
          grade: "B",
          edit: 8,
        },
        {
          price: 2000,
          grade: "C",
          edit: 6,
        },
        {
          price: 1000,
          grade: "C",
          edit: 2,
        },
        {
          price: 10000,
          grade: "A",
          edit: 3,
        },
      ];

      this.users = [
        {
          name: "김도현1",
          studentNum: 20160140,
          day: "03/01",
          time: "오후 3시",
        },
        {
          name: "김도현2",
          studentNum: 20160141,
          day: "03/07",
          time: "오후 8시",
        },
        {
          name: "김도현3",
          studentNum: 20160142,
          day: "03/04",
          time: "오후6시",
        },
        {
          name: "김도현4",
          studentNum: 20160143,
          day: "03/08",
          time: "오후 2시",
        },
      ];
    },

    //수정하려고 누르자 마자 수행
    //누른 곳의 데이터를 가져와서 다이얼로그와 바로 연결하기 위한 함수
    editItem(item) {
      console.log("editItem");
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //삭제 아이콘을 누르자 마자 수행
    deleteItem(item) {
      console.log("deleteItem");
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    //삭제 확인을 누르면 수행
    deleteItemConfirm() {
      console.log("deleteItemConfirm");
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    //dialog 닫히면 수행
    close() {
      console.log("close");
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //삭제 확인을 누르면 deleteItemConfirm 이후 수행
    closeDelete() {
      console.log("closeDelete");
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //신규 데이터 생성, 기존 데이터 변경 시 save 를 누르면 수행
    save() {
      console.log("save");
      //입력값 확인
      //   if() {

      //   }

      //수정하는경우
      if (this.editedIndex > -1) {
        console.log("수정");
        Object.assign(this.users[this.editedIndex], this.editedItem);
        this.users[this.editedIndex].day = this.dateStringSlice;
      }
      //추가하는 경우
      else {
        console.log("추가");
        this.editedItem.day = this.dateStringSlice;
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.mdi-arrow-up {
  width: 13px;
  height: 0px;
}
</style>