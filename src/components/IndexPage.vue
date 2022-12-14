<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card elevation="2" class="py-2 px-3">
          <v-card-title>
            {{ action }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              :color="action === 'Add Todo' ? 'primary' : 'success'"
              v-model="todo"
              label="Tile"
              hint="Input new todo title here"
              persistent-hint
              prepend-icon="mdi-format-title"
              append-icon="mdi-send"
              @click:append="performAction"
              @keypress.enter="performAction">
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <v-sheet elevation="2">
          <v-list dense>
            <template v-for="(todo, index) in todos">
              <v-list-item :key="todo.id">
                <v-list-item-icon>
                  <v-avatar>
                    <v-icon
                      @click="toggleTodo(index)"
                      :color="todo.completed ? 'success' : 'warning'">
                      {{ todo.completed ? 'mdi-check' : 'mdi-close' }}
                    </v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    :class="{ 'text-decoration-line-through': todo.completed }">
                    {{ todo.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn icon>
                      <v-icon color="primary" @click="setEdit(index)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteTodo(index)">
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import uniqid from 'uniqid'

export default {
  name: 'IndexPage',

  data: () => ({
    action: 'Add Todo',
    todoIndex: null,
    todo: null,
    todos: []
  }),

  methods: {
    performAction () {
      if (this.action === 'Add Todo') this.addTodo()
      else this.editTodo()
    },
    addTodo () {
      if (this.todo !== null && this.todo.trim().length) {
        this.todos.push({
          id: uniqid(),
          title: this.todo,
          completed: false
        })
        this.todo = null
        this.persistData()
      }
    },
    toggleTodo (index) {
      this.todos[index].completed = !this.todos[index].completed
      this.persistData()
    },
    deleteTodo (index) {
      this.todos.splice(index, 1)
      this.persistData()
    },

    editTodo () {
      if (this.todo !== null && this.todo.trim().length) {
        this.todos[this.todoIndex].title = this.todo
        this.todo = null
        this.action = 'Add Todo'
        this.todoIndex = null
        this.persistData()
      }
    },
    setEdit (index) {
      this.todoIndex = index
      this.action = 'Edit Todo'
      this.todo = this.todos[index].title
    },

    persistData () {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    retrieveData () {
      this.todos = JSON.parse(localStorage.getItem('todos'))
      if (this.todos === null) this.todos = []
    }
  },

  mounted () {
    this.retrieveData()
  }
}
</script>
