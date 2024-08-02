<template>
  <div class="modal-wrapper">
    <div class="modal-head">
      <div class="h3-regular modal-title">
        {{ "Добавить пользователя" }}
      </div>
      <!-- <BaseCloseButton @click="onClose" /> -->
    </div>
    <hr class="line-hr" />
    <div class="modal-body">
      <div class="wrapper">
        <div class="paragraph-bold">Имя</div>
        <div class="wrapper">
          <BaseInput @input-change="handleName" />
        </div>
      </div>
      <div class="wrapper">
        <div class="paragraph-bold">Телефон</div>
        <div class="wrapper">
          <BaseInput :mask="'+7-XXX-XXX-XX-XX'" @input-change="handlePhone" />
        </div>
      </div>
      <div class="wrapper">
        <div class="paragraph-bold">Начальник</div>
        <BaseSearchSelect :options="userList" @select-change="handleBoss" />
      </div>
    </div>
    <div class="modal-footer">
      <BaseButton
        :isBtnDisabled="btnDisabled"
        :btn-text="successButton"
        @click="createUser(newUser)"
      />
      <BaseButton
        :btn-text="canselButton"
        :variant="'white'"
        @click="onClose"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import BaseCloseButton from "@/components/BaseCloseButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSearchSelect from "@/components/BaseSearchSelect.vue";

export default {
  name: "AddModal",
  components: {
    BaseButton,
    // BaseCloseButton,
    BaseInput,
    BaseSearchSelect,
  },
  data: () => {
    return {
      successButton: "Сохранить",
      canselButton: "Отмена",
      newUser: {
        id: null,
        title: "",
        phone: "",
        children: [],
        parent: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      userList: 'users/getUserList',
    }),
    btnDisabled() {
      if (this.newUser.title === '') {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    this.generateUserId()
  },
  methods: {
    ...mapActions({
      sendhUser: 'users/sendhUser',
    }),
    onClose() {
      this.$emit("close");
    },
    handleName(val) {
      this.newUser.title = val
    },
    generateUserId() {
      this.newUser.id = Math.floor(100000 + Math.random() * 900000);
    },
    handlePhone(val) {
      this.newUser.phone = val
    },
    handleBoss(val) {
      this.newUser.parent.push(val)
    },
    createUser(newUser) {
      this.sendhUser(newUser);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
}
.modal-wrapper {
  width: 500px;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background: $white-color;
  box-shadow: 0 5px 20px 0 rgba(75, 70, 92, 0.4);
  display: flex;
  flex-direction: column;
}

.modal-body-wide {
  height: 654px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
