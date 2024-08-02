<template>
  <div class="block-for-table">
    <div class="main-table">
      <div>
        <div class="head">
          <div class="table-column-head">Имя</div>
          <div class="table-column-head">Телефон</div>
        </div>
      </div>
      <div>
        <nested-table-row
          v-for="item in rootItems"
          :key="item.id"
          :item="item"
          :depth="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NestedTableRow from './NestedTableRow.vue';

export default {
  name: 'NestedTable',
  components: {
    NestedTableRow
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    rootItems() {
      const childIds = new Set();
      this.items.forEach(item => {
        if (item.children) {
          item.children.forEach(child => {
            childIds.add(child.id);
          });
        }
      });
      return this.items.filter(item => !childIds.has(item.id));
    }
  }
};
</script>


<style lang="scss" scoped>
.block-for-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
  overflow: auto hidden;
}

.main-table {
  width: 100%;
  background-color: #fff;
  border-collapse: collapse;
  margin-top: 40px;
}

.head {
  display: flex;
}

.table-column-head {
  width: 50%;
  background-color: $primary-color;
  color: #fff;
  padding: 14px;
  border: 1px solid #fff;
}
</style>
