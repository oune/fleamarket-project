<template>
  <v-container>
    <!-- 책이름, 저자,출판사, 검색 -->
    <v-row>
      <v-col cols="12">
        <v-card class="cover">
          <v-card-title>
            <v-col offset="1" cols="3"> 책이름 </v-col>
            <v-col>
              <h3>{{ this.$route.params.title }}</h3>
            </v-col>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-title>
            <v-col offset="1" cols="3"> 저자 </v-col>
            <v-col>
              <h3>{{ this.$route.params.author }}</h3>
            </v-col>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-title>
            <v-col offset="1" cols="3"> 출판사 </v-col>
            <v-col>
              <h3>{{ this.$route.params.publisher }}</h3>
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
                <v-toolbar-title>재고 목록</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog persistent v-model="dialogBook" max-width="500px">
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
                            <v-select
                              :items="selectState"
                              label="책상태"
                              v-model="editedBookItem.state"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeBook">
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
                <v-dialog
                  persistent
                  v-model="dialogBookDelete"
                  max-width="500px"
                >
                  <v-card>
                    <v-container>
                      <v-row>
                        <v-col cols="6"></v-col>
                        <v-col cols="6"></v-col>
                      </v-row>
                    </v-container>
                    <v-card-title class="headline"
                      >재고를 삭제하시겠습니까</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeBookDelete"
                        >아니오</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteBookItemConfirm"
                        >네</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editBookItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteBookItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-progress-linear indeterminate color="cyan"></v-progress-linear>
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
                <v-toolbar-title>
                  예약 현황 {{ curUserNum }} / {{ totalUserNum }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="userRefresh">
                  새로고침
                </v-btn>

                <!-- 삭제 -->
                <v-dialog
                  persistent
                  v-model="dialogUserDelete"
                  max-width="500px"
                >
                  <v-card>
                    <v-container>
                      <v-row>
                        <v-col cols="6"></v-col>
                        <v-col cols="6"></v-col>
                      </v-row>
                    </v-container>
                    <v-card-title class="headline"
                      >예약을 삭제하시겠습니까?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeUserDelete"
                        >아니오</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteUserItemConfirm"
                        >네</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="deleteUserItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-progress-linear indeterminate color="cyan"></v-progress-linear>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar class="snackbar" v-model="snackbar" :timeout="timeout" bottom>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import api from "@/key";
export default {
  data() {
    return {
      selectState: ["A", "B", "C"],

      //현재 예약자 수
      curUserNum: 0,
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
        { text: "시간", value: "time" },
        { text: "삭제", value: "actions", sortable: false },
      ],

      //   책목록 배열
      books: [],

      //   예약자 목록 배열
      users: [],

      test: "가나다라",

      dialogBook: false,
      dialogBookDelete: false,

      dialogUser: false,
      dialogUserDelete: false,

      //책
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

      //사용자
      editedUserIndex: -1,
      editedUserItem: {
        name: "",
        studentId: "",
        day: "",
        time: "",
      },
      defaultUserItem: {
        name: "",
        studentId: "",
        day: "",
        time: "",
      },

      // 삭제 관련 변수

      // 해당 재고 책 아이디
      delBookId: "",

      //해당 사용자 아이디, 비밀번호
      delUserId: "",
      delUserPs: "",

      //스낵바
      snackbar: false,
      text: "",
      timeout: 1000,

      isRefresh: false,
    };
  },

  computed: {
    formTitle() {
      return this.editedBookIndex === -1 ? "추가" : "수정";
    },
  },

  watch: {
    // 재고
    dialogBook(val) {
      val || this.closeBook();
    },
    dialogBookDelete(val) {
      val || this.closeBookDelete();
    },

    // 예약
    dialogUser(val) {
      val || this.closeUser();
    },
    dialogUserDelete(val) {
      val || this.closeUserDelete();
    },
  },

  // api 연결
  //테이블 초기화.
  created() {
    this.bookId = this.$route.params.id;
    this.initialize();
  },

  methods: {
    //스낵바(알림)
    snackbarControll(inputText) {
      this.snackbar = true;
      this.text = inputText;
    },

    userRefresh() {
      this.isRefresh = true;
      this.getUserList();
    },

    //재고 목록 조회
    //초기화 함수(재고, 예약)
    //현재 등록되어 있는 책의 수(totalUserNum), 책 정보를 가져와서 재고 테이블에 초기화.
    async getBookList() {
      //상위 컴포넌트로부터 props를 받던 get방식으로 받던 책의 id값을 받아와서 해당 api에 던져줘야 함.
      await this.axios
        .get(`${api.url}/books/${this.bookId}/stocks`)
        .then((res) => {
          this.totalUserNum = res.data.length;
          this.books = res.data;
        })
        .catch((err) => {
          this.snackbarControll("재고 목록 조회 실패");
          console.log(err);
        });
    },

    //예약 목록 조회

    //현재 예약자 수(curUserNum), 예약자 총 명단을 가져와서 예약자 명단 테이블에 초기화.
    async getUserList() {
      await this.axios
        .get(`${api.url}/books/${this.bookId}/reservations`)
        .then((res) => {
          this.curUserNum = res.data.length;
          this.users = res.data;
          if (this.isRefresh) {
            this.snackbarControll("예약 목록 새로고침 성공");
            this.isRefresh = !this.isRefresh;
          }
        })
        .catch((err) => {
          this.snackbarControll("예약 목록 조회 실패");
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

    // 예약 삭제 통신 함수
    delUsers() {
      this.axios
        .delete(
          `${api.url}/admin/books/${this.bookId}/reservations/${this.delUserId}`
        )
        .then(() => {
          this.snackbarControll("예약을 삭제하였습니다.");
          this.getUserList();
        })
        .catch((err) => {
          this.snackbarControll("예약 삭제 실패");
          console.log(err);
        });
    },

    deleteUserItem(item) {
      this.delUserId = item.id;
      this.delUserPs = item.password;
      this.editedUserIndex = this.users.indexOf(item);
      this.editedUserItem = Object.assign({}, item);
      this.dialogUserDelete = true;
    },

    //삭제 확인을 누르면 수행
    deleteUserItemConfirm() {
      this.delUsers();
      this.users.splice(this.editedUserIndex, 1);
      this.closeUserDelete();
    },

    //dialog 닫히면 수행
    closeUser() {
      this.dialogUser = false;
      this.$nextTick(() => {
        this.editedUserItem = Object.assign({}, this.defaultUserItem);
        this.editedUserIndex = -1;
      });
    },

    //삭제 확인을 누르면 deleteItemConfirm 이후 수행
    closeUserDelete() {
      this.dialogUserDelete = false;
      this.$nextTick(() => {
        this.editedUserItem = Object.assign({}, this.defaultUserItem);
        this.editedUserIndex = -1;
      });
    },

    //-----예약 기능함수 끝-----

    //책 목록관련

    //통신 함수

    //재고 추가
    addBooksList(item) {
      let body = {
        name: item.name,
        studentId: item.studentId,
        price: item.price,
        state: item.state,
      };

      this.axios
        .post(`${api.url}/admin/books/${this.bookId}/Stocks`, body)
        .then(() => {
          //새로고침.
          this.snackbarControll("재고를 추가하였습니다.");
          this.getBookList();
        })

        .catch((err) => {
          this.snackbarControll("재고 추가 실패");
          console.log(err);
        });
    },

    //재고 수정
    modiBooksList(item) {
      let body = {
        name: item.name,
        studentId: item.studentId,
        price: item.price,
        state: item.state,
      };
      this.axios
        .put(`${api.url}/admin/stocks/${item.id}`, body)
        .then(() => {
          this.snackbar = true;
          this.snackbarControll("재고를 수정하였습니다.", "success");
        })
        .catch((err) => {
          this.snackbarControll("재고 수정 실패");
          console.log(err);
        });
    },

    //재고 삭제
    delBooks() {
      this.axios
        .delete(
          `${api.url}/admin/books/${this.bookId}/stocks/${this.delBookId}`
        )
        .then(() => {
          this.getBookList();
          this.snackbarControll("재고를 삭제하였습니다.");
        })
        .catch((err) => {
          this.snackbarControll("재고 삭제 실패");
          console.log(err);
        });
    },

    //-----통신 함수 끝-----

    //재고 기능 동작 함수
    editBookItem(item) {
      this.editedBookIndex = this.books.indexOf(item);
      this.editedBookItem = Object.assign({}, item);
      this.dialogBook = true;
    },

    //삭제 아이콘을 누르자 마자 수행
    deleteBookItem(item) {
      // 해당 재고 아이디값 설정
      this.delBookId = item.id;

      this.editedBookIndex = this.books.indexOf(item);
      this.editedBookItem = Object.assign({}, item);
      this.dialogBookDelete = true;
    },

    //삭제 확인을 누르면 수행
    deleteBookItemConfirm() {
      //백엔드 삭제 요청
      this.delBooks();

      this.books.splice(this.editedBookIndex, 1);
      this.closeBookDelete();
    },

    //dialog 닫히면 수행
    closeBook() {
      // dialog 닫히면 초기화
      (this.delBookId = ""), (this.dialogBook = false);
      this.$nextTick(() => {
        this.editedBookItem = Object.assign({}, this.defaultBookItem);
        this.editedBookIndex = -1;
      });
    },

    //삭제 확인을 누르면 deleteItemConfirm 이후 수행
    closeBookDelete() {
      this.dialogBookDelete = false;
      this.$nextTick(() => {
        this.editedBookItem = Object.assign({}, this.defaultBookItem);
        this.editedBookIndex = -1;
      });
    },

    //신규 데이터 생성, 기존 데이터 변경 시 save 를 누르면 수행
    save() {
      //수정하는경우
      if (this.editedBookIndex > -1) {
        Object.assign(this.books[this.editedBookIndex], this.editedBookItem);

        this.modiBooksList(this.books[this.editedBookIndex]);
      }
      //추가하는 경우
      else {
        this.books.push(this.editedBookItem);

        //재고추가 post
        const curIndex = this.books.indexOf(this.editedBookItem);
        this.addBooksList(this.books[curIndex]);
      }
      this.closeBook();
    },
  },
};
</script>

<style>
.mdi-arrow-up {
  width: 12px;
  height: 0px;
}

.snackbar {
  margin-bottom: 5vh;
}
</style>