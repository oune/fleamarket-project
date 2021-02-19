<template>
    <div class = 'wrap'>
    <form class = 'form-field'>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      label="이름"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="출판사"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="저자"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-text-field>
    <div class = 'button-field'>
    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
    </div>
  </form>
    </div>
</template>

<script>
export default {
    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
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

