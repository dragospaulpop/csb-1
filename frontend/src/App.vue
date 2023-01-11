<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        TODOS
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout" v-if="user">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'MyApp',

  computed: {
    user () {
      return this.$store.getters.user
    }
  },

  methods: {
    async logout () {
      const res = await this.$store.dispatch('logout')

      if (res === true) {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
