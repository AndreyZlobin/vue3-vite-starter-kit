<template>
  <div id="app">
    <div class="flex w-full">
      <div class="min-h-screen w-full flex overflow-x-scroll py-12">
        <div
          v-for="column in columns"
          :key="column.title"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
            {{ column.title }}
          </p>
          <draggable
            v-model="column.tasks"
            :animation="200"
            group="tasks"
            item-key="id"
            class="h-full"
            ghost-class="ghost-card"
          >
            <template #item="{ element }">
              <kanban-card class="mt-3 cursor-move" :task="element"></kanban-card>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import KanbanCard from "~/components/shared/kanban/kanban-card.vue";

export default defineComponent({
  name: "VKanban",
  components: {
    KanbanCard,
    draggable,
  },
  data() {
    return {
      drag: false,
      columns: [
        {
          title: "Backlog",
          tasks: [
            {
              id: 1,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
            {
              id: 2,
              title: "Provide documentation on integrations",
              date: "Sep 12",
            },
            {
              id: 3,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design",
            },
            {
              id: 4,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
            {
              id: 5,
              title: "Test checkout flow",
              date: "Sep 15",
              type: "QA",
            },
          ],
        },
        {
          title: "In Progress",
          tasks: [
            {
              id: 6,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design",
            },
            {
              id: 7,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
            {
              id: 8,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend",
            },
          ],
        },
        {
          title: "Review",
          tasks: [
            {
              id: 9,
              title: "Provide documentation on integrations",
              date: "Sep 12",
            },
            {
              id: 10,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design",
            },
            {
              id: 11,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
            {
              id: 12,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design",
            },
            {
              id: 13,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
          ],
        },
        {
          title: "Done",
          tasks: [
            {
              id: 14,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
            {
              id: 15,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design",
            },
            {
              id: 16,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange() {
      console.log("changed");
    },
    inputChanged(value) {
      console.log(value);
    },
    getComponentData() {
      return {
        onChange: this.handleChange,
        onInput: this.inputChanged,
        wrap: true,
      };
    },
  },
});
</script>
<style scoped>
.column-width {
  min-width: 320px;
  width: calc(100% / 3);
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
