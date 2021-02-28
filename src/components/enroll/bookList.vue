<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          class="elevation-1"
          mobile-breakpoint="0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title> List of books </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Add a book
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.title"
                            label="title"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.publisher"
                            label="publisher"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.author"
                            label="author"
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
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card style="text-align: center">
                  <v-card-title class="headline"
                    >삭제하시겠습니까?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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

            <v-icon small class="mr-5" @click="postDetail(item)">
              mdi-arrow-up-bold-box-outline
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data> Loading </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    sendID: "",
    sendPublisher: "",
    sendAuthor: "",
    sendTitle: "",
    search: "",
    headers: [
      {
        text: "title",
        align: "center",
        sortable: true,
        value: "title",
      },
      { text: "publisher", value: "publisher", align: "center" },
      { text: "author", value: "author", align: "center" },
      { text: "stocks", value: "stockCount", sortable: false, align: "center" },
      {
        text: "reservations",
        value: "reservationCount",
        sortable: false,
        align: "center",
      },
      { text: "Actions", value: "actions", sortable: false, align: "center" },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      publisher: "",
      author: "",
      stocks: "",
    },
    defaultItem: {
      title: "",
      publisher: "",
      author: "",
      stocks: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Book" : "Edit Book";
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios
        .get("https://us-central1-kit-fleamarket.cloudfunctions.net/books")
        .then((res) => {
          this.data = res.data;
          console.log(this.data);
        });
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      console.log(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log("deleteItem");
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // console.log(this.data[this.editedIndex].id);
      this.axios
        .delete(
          "https://us-central1-kit-fleamarket.cloudfunctions.net/admin/books/" +
            this.data[this.editedIndex].id
        )
        .then((res) => {
          alert("삭제되었습니다.");
          console.log(res);
          this.data.splice(this.editedIndex, 1);
          this.initialize();
        })
        .catch((res) => {
          console.log(res);
          alert("새로고침 후 다시 시도해주세요.");
        });

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      // console.log('close()');
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.data[this.editedIndex], this.editedItem)
        console.log(this.data[this.editedIndex].id);
        this.axios
          .put(
            "https://us-central1-kit-fleamarket.cloudfunctions.net/admin/books/" +
              this.data[this.editedIndex].id,
            {
              title: this.editedItem.title,
              publisher: this.editedItem.publisher,
              author: this.editedItem.author,
            }
          )
          .then((res) => {
            console.log(res);
            alert("수정되었습니다.");
            this.initialize();
          })
          .catch((res) => {
            alert("오류발생");
            console.log(res);
          });
      } else {
        this.axios
          .post(
            "https://us-central1-kit-fleamarket.cloudfunctions.net/admin/books",
            {
              title: this.editedItem.title,
              publisher: this.editedItem.publisher,
              author: this.editedItem.author,
            }
          )
          .then(() => {
            alert("등록되었습니다.");
            this.initialize();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.close();
    },
    postDetail(item) {
      this.sendID = item.id;
      this.sendPublisher = item.publisher;
      this.sendAuthor = item.author;
      this.sendTitle = item.title;
      this.$router.push({
        path: "/about",
        query: {
          id: this.sendID,
          publisher: this.sendPublisher,
          author: this.sendAuthor,
          title: this.sendTitle,
        },
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  position: absolute;
  top: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>