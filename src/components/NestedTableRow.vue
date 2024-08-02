<template>
  <div>
    <div class="row">
      <div :style="{ marginLeft: depth * 40 + 'px', width: currentWidth }" class="column-cell">{{ item.title }}</div>
      <div class="column-cell">{{ item.phone }}</div>
    </div>
    <template v-if="item.children && item.children.length">
      <nested-table-row
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :depth="depth + 1"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'NestedTableRow',
  props: {
    item: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      default: 0
    }
  },

  computed: {
    currentWidth() {
      return `calc(100% - ${this.depth * 40}px)`;
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
display: flex;
}
.column-cell {
  width: 50%;
  background-color: $primary-color-light;
  color: #000;
  padding: 14px;
  border: 1px solid $white-color;
}
.column-cell:first-of-type {
  flex: 1;
}
</style>