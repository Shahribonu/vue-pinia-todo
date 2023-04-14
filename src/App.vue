<template>
  <main>
    <header>
      <img src="./logo.png" alt="logo" />
      <h1>Shahribonu</h1>
    </header>

    <div class="newTask">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="all">all</button>

      <button @click="favs">fav</button>
    </nav>

    <div class="loading" v-if="taskStore.loading">Loading tasks....</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>you have {{ taskStore.favcount }} favourite tasks</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";
// import TaskForm from './components/TaskForm.vue'
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();
    let filter = ref("all");
    const favs = () => {
      filter.value = "favs";
      taskStore.getTasks();
    };
    const all = () => {
      filter.value = "all";
      console.log("all");
    };
    return { taskStore, filter, all, favs };
  },
};
</script>

<style scoped></style>
