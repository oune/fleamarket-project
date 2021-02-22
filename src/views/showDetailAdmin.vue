<template>
  <v-container>
    <!-- 책이름, 저자,출판사, 검색 -->
    <!-- 현재 로딩 화면 X -->
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
          <!-- 예약자 명단 테이블 -->
          <v-data-table
            :headers="bookHeaders"
            :items="books"
            sort-by="name"
            class="elevation-1"
            mobile-breakpoint="0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>책이름 들어올 곳</v-toolbar-title>
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
                      추가하기
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
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedBookItem.name"
                              label="판매자 이름"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedBookItem.studentId"
                              label="판매자 학번"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedBookItem.price"
                              label="판매가격"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedBookItem.state"
                              label="책상태"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        취소
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        저장
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
                <v-toolbar-title>예약자 명단</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-toolbar-title
                  >{{ curUserNum }}/{{ totalUserNum }}</v-toolbar-title
                >
                <v-spacer></v-spacer>

                <!-- 삭제 -->
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

      //현재 페이지의 책 아이디값.
      bookId: "ssDI5FcuSi2m09teFn5G",

      // 총 등록 책 수
      bookNum: "",

      //현재 예약자 수
      curUserNum: "",
      //총 예약 가능한 수
      totalUserNum: "",

      bookHeaders: [
        {
          text: "이름",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "학번", value: "studentId" },
        { text: "판매가격(원)", value: "price" },
        { text: "책상태", value: "state" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      userHeaders: [
        {
          text: "이름",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "학번", value: "studentId" },
        { text: "날짜", value: "day" },
        { text: "시간", value: "time" },
        { text: "삭제", value: "actions", sortable: false },
      ],

      //   책목록 배열
      books: [],

      //   예약자 목록 배열
      users: [],

      test: "가나다라",

      dialog: false,
      dialogDelete: false,
      editedBookIndex: -1,
      editedBookItem: {
        name: "",
        studentId: "",
        price: "",
        state: "",
      },
      defaultBookItem: {
        name: "",
        studentId: "",
        price: "",
        state: "",
      },
    };
  },

  //책이름, 저자, 출판사, id 값을 props로 전달 받음.
  props: {},

  computed: {
    formTitle() {
      return this.editedBookIndex === -1 ? "추가" : "수정";
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

  beforeMount() {
    // this.getBookList();
  },

  // api 연결
  //테이블 초기화.
  created() {
    this.initialize();
  },

  methods: {
    //통신 테스트
    //res.data.length : 가져올 책목록 수

    /*
    axios 를 이용한 통신 방법.
    this.axios로 호출
    get,post,put,del 모두 동일한 형태로 다음과 같이 호출

    this.axios.get().then().catch()
    this.axios.post().then().catch()
    this.axios.put().then().catch()
    this.axios.del().then().catch()

    .then() 은 통신 성공하는 경우
    .catch() 는 통신 실패 하는 경우

    .then((res) => {

    })
    통신 성공하는 경우 서버에서 response 로 보내주는 값을 res 인자로 받아서 로직 구현 가능
    (무명함수에 res 를 인자로 받아 함수를 생성하는 것.)

    모르겠으면 res 로 받고 바로 console.log(res) 를 찍어보고 그 안에 어떤식으로 되어있는지 확인해서 사용 하면 됨.

    .catch((err) => {

    })
    통신 실패 하는 경우도 마찬가지.
    이때 res, err는 편의상 사용하는 것이기 때문에 이름이 바뀌어도 무관.

    아래가 사용 예시.
    
    */

    //재고 목록 조회
    //초기화 함수(재고, 예약)
    //현재 등록되어 있는 책의 수(totalUserNum), 책 정보를 가져와서 재고 테이블에 초기화.
    async getBookList() {
      //상위 컴포넌트로부터 props를 받던 get방식으로 받던 책의 id값을 받아와서 해당 api에 던져줘야 함.
      await this.axios
        .get(
          `https://us-central1-kit-fleamarket.cloudfunctions.net/books/${this.bookId}/stocks`
        )
        .then((res) => {
          console.log(res);
          //   console.log(res.data);
          this.totalUserNum = res.data.length;
          this.books = res.data;
          //   console.log(books);
          //   console.log(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //예약 목록 조회

    //현재 예약자 수(curUserNum), 예약자 총 명단을 가져와서 예약자 명단 테이블에 초기화.
    async getUserList() {
      await this.axios
        .get(
          `https://us-central1-kit-fleamarket.cloudfunctions.net/books/${this.bookId}/reservations`
        )
        .then((res) => {
          this.curUserNum = res.data.length;
          this.users = res.data;
          console.log(res.data[0].time);
          console.log(res.data[0].time.slice(5, 7)); //월
          console.log(res.data[0].time.slice(8, 10)); //일
          console.log(res.data[0].time.slice(11, 13)); //시간
          this.users =
          //   console.log(res.data);
          //   this.users = res.data;
          //   console.log(books);
          //   console.log(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //각 함수 호출, 초기화
    //created 에서 수행.
    initialize() {
      // 재고 목록 초기화
      this.getBookList();

      // 예약 목록 초기화
      this.getUserList();
    },

    //-----초기화 함수 끝-----

    //사용자 에약 목록관련
    //기존 예약 조회, 삭제기능.

    // deleteUserItem(item) {
    //   console.log("deleteItem");
    //   this.editedIndex = this.books.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogDelete = true;
    // },

    // //삭제 확인을 누르면 수행
    // deleteUserItemConfirm() {
    //   console.log("deleteItemConfirm");
    //   this.books.splice(this.editedIndex, 1);
    //   this.closeDelete();
    // },

    // //dialog 닫히면 수행
    // close() {
    //   console.log("close");
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // //삭제 확인을 누르면 deleteItemConfirm 이후 수행
    // closeUserDelete() {
    //   console.log("closeDelete");
    //   this.dialogDelete = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    //-----예약 기능함수 끝-----

    //책 목록관련

    //통신 함수
    //git ignore 로 주소를 숨길 필요가 있을듯.

    //재고 추가
    addBooksList(item) {
      console.log("데이터");
      let body = {
        name: item.name,
        studentId: item.studentId,
        price: item.price,
        state: item.state,
      };
      this.axios
        .post(
          `https://us-central1-kit-fleamarket.cloudfunctions.net/admin/books/${this.bookId}/Stocks`,
          body
        )
        .then

        //     (res) => {
        //     console.log(res);
        // }
        ()

        .catch((err) => {
          console.log(err);
        });
    },

    //재고 수정
    modiBooksList(item) {
      console.log("modiBookList");
      let body = {
        name: item.name,
        studentId: item.studentId,
        price: item.price,
        state: item.state,
      };
      this.axios
        .put(
          `https://us-central1-kit-fleamarket.cloudfunctions.net/admin/stocks/${item.id}`,
          body
        )
        .then((res) => {
          console.log("수정 성공.");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //재고 삭제
    delBooks() {},

    //-----통신 함수 끝-----

    //기능 동작 함수
    editItem(item) {
      console.log("editItem");
      this.editedBookIndex = this.books.indexOf(item);
      this.editedBookItem = Object.assign({}, item);
      this.dialog = true;
    },

    //삭제 아이콘을 누르자 마자 수행
    deleteItem(item) {
      console.log("deleteItem");
      this.editedBookIndex = this.books.indexOf(item);
      this.editedBookItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    //삭제 확인을 누르면 수행
    deleteItemConfirm() {
      console.log("deleteItemConfirm");
      this.books.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    //dialog 닫히면 수행
    close() {
      console.log("close");
      this.dialog = false;
      this.$nextTick(() => {
        this.editedBookItem = Object.assign({}, this.defaultBookItem);
        this.editedBookIndex = -1;
      });
    },

    //삭제 확인을 누르면 deleteItemConfirm 이후 수행
    closeDelete() {
      console.log("closeDelete");
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedBookItem = Object.assign({}, this.defaultBookItem);
        this.editedBookIndex = -1;
      });
    },

    //신규 데이터 생성, 기존 데이터 변경 시 save 를 누르면 수행
    save() {
      console.log("save");
      //입력값 확인
      //   if() {

      //   }

      //수정하는경우
      if (this.editedBookIndex > -1) {
        console.log("수정");
        Object.assign(this.books[this.editedBookIndex], this.editedBookItem);

        this.modiBooksList(this.books[this.editedBookIndex]);
      }
      //추가하는 경우
      else {
        console.log("추가");
        this.books.push(this.editedBookItem);

        //재고추가 post
        const curIndex = this.books.indexOf(this.editedBookItem);
        this.addBooksList(this.books[curIndex]);
      }
      this.close();
    },
  },
};
</script>

<style>
.mdi-arrow-up {
  width: 12px;
  height: 0px;
}
</style>