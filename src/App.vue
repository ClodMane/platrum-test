<template>
  <div id="app">
    <div class="content">
      <div class="btn-wrapper">
        <BaseButton :btnText="'Добавить'" @click="showModal" />
      </div>
      <NestedTable :items="userList"></NestedTable>
    </div>
    <AddModal v-if="modalVisible" @close="closeModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from "@/components/BaseButton.vue";
import AddModal from "@/components/AddModal.vue";
import NestedTable from "@/components/NestedTable.vue";

export default {
  name: "App",
  components: {
    BaseButton,
    AddModal,
    NestedTable,
  },
  data: () => {
    return {
      modalVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      userList: 'users/getUserList',
    }),
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/main.scss";

.content {
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;
  padding: 20px;
  border: 1px solid $primary-color;
  border-radius: 10px;
}
.btn-wrapper {
  display: flex;
  gap: 20px;
  width: 200px;
}
</style>
