<template>
  <div id="app">
    <BaseButton :btnText="'Добавить'"/>
    <BaseInput :placeholder="'Добавить'"/>
    <BaseSearchSelect :options="[{title: 1}, {title: 2}]"/>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSearchSelect from '@/components/BaseSearchSelect.vue'

export default {
  name: 'App',
  components: {
    BaseButton,
    BaseInput,
    BaseSearchSelect
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';

</style>
