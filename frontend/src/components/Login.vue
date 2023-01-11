<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-card elevation="2">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                  label="Email"
                  hint="Your user email"
                  :rules="[required]"
                  clearable
                  >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="pass"
                  label="Password"
                  hint="Your user password"
                  :rules="[required]"
                  clearable
                  >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-alert type="error" v-if="mes">
                  {{ mes }}
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              :disabled="!email || !pass"
              @click="login"
              >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginComponent',

  data: () => ({
    email: null,
    pass: null,
    mes: null
  }),

  methods: {
    required (value) {
      return !!value || 'This is a required field'
    },
    async login () {
      const email = this.email.trim()
      const pass = this.pass.trim()

      if (email.length && pass.length) {
        const res = await this.$store.dispatch('login', { email, pass })

        if (res === true) {
          this.$router.push({ name: 'home' })
        } else {
          this.mes = res
        }
      }
    }
  }
}
</script>
