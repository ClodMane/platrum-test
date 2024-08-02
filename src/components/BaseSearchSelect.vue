<template>
    <div
      v-click-outside="close"
      class="select-wrapper"
      :class="{ open: isSelectOpen && !disabled, disabled: disabled }"
      @click="toggleOptions"
    >
      <div
        class="select-label">
        <div class="paragraph-regular placeholder">
          <input
            v-model="searchValue"
            type="text"
            class="paragraph-regular search-input"
            :placeholder="placeholder"
            @input="searchFilter"
          />
        </div>
        <IconSearch class="icon-row" />
      </div>
      <div class="select-options scrollbar-colored">
        <div
          v-for="(option, index) in filteredItems"
          :key="index"
          class="paragraph-regular select-label"
          @click.stop="setActiveOption(option)"
        >
          {{ option?.title }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import IconSearch from '../assets/icons/icon-arrow-down.svg?inline'
  
  export default {
    name: 'BaseSearchSelect',
    components: {
      IconSearch,
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
  
      placeholder: {
        type: String,
        default: '',
      },
  
      active: {
        type: [Number, String],
        default: null,
      },
  
      isOpen: {
        type: Boolean,
        default: false,
      },
  
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  
    data() {
      return {
        activeItem: null,
        isSelectOpen: false,
        searchValue: '',
        filteredItems: [],
      }
    },
    watch: {
      isOpen(newVal) {
        this.isSelectOpen = newVal
      },
  
      options: {
        immediate:true,
        handler(newVal) {
          if (this.active !== null) {
            this.$nextTick(() => {
              this.activeItem = this.options.find(el => el.id === +this.active)
              this.searchValue = this.activeItem?.title || null
            })
          }
  
          this.filteredItems = newVal
        },
      },
  
      active: {
        handler(newVal) {
          if (newVal === null) {
            this.searchValue = ''
            this.activeItem = null
          } else {
            this.activeItem = this.options.find(el => el.id === this.active)
            this.searchValue = this.activeItem?.title || null
          }
        },
        immediate: true,
      },
    },
  
    mounted() {
      console.log(this.options)
      this.filteredItems = [...this.options]
    },
  
    methods: {
      close() {
        this.isSelectOpen = false
      },
      toggleOptions() {
        if (!this.disabled) {
          this.isSelectOpen = !this.isSelectOpen
        }
      },
  
      filterOptions() {
        if (this.activeItem !== null) {
          this.filteredItems = this.options.filter(
            el => el?.title !== this.activeItem?.title,
          )
        } else {
          this.filteredItems = this.options
        }
      },
  
      searchFilter() {
        if (this.searchValue.length) {
          this.filteredItems = this.options.filter(el =>
            el.title.toLowerCase().includes(this.searchValue.toLowerCase()),
          )
        } else {
          this.filteredItems = this.options
        }
      },
  
      setActiveOption(item) {
        this.close()
        this.activeItem = item
        this.searchValue = this.activeItem.title
        this.filterOptions()
        this.$emit('select-change', item.id)
        this.$emit('select-value-change', item.title)
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  
  .select-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40px;
    align-items: flex-start;
    border-radius: 6px;
    border: 1px solid rgba(88, 86, 91, 0.2);
    box-shadow: none;
    background-color: $white-color;
    transition: $default-transition;
    cursor: pointer;
  
    &.open,
    &:hover {
      border: 1px solid $primary-color;
      box-shadow: 0 2px 4px 0 $box-shadow-color;
    }
  
    &.open {
      height: 216px;
  
      .icon-row {
        transform: rotateX(180deg);
        color: $body-text;
      }
  
      .select-options {
        opacity: 1;
      }
    }
  
    &.disabled {
      pointer-events: none;
      background-color: #cccdce;
      border: 1px solid #cccdce;
    }
  }
  
  .placeholder {
    color: $placeholder-text;
    width: 100%;
  }
  
  .select-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 9px;
    transition: $default-transition;
  }
  
  .icon-row {
    color: $placeholder-text;
    transition: $default-transition;
  }
  
  .select-options {
    width: 100%;
    height: 100%;
    transition: $default-transition;
    opacity: 0;
    overflow-x: auto;
  
    .select-label:hover {
      background-color: $hover-color;
    }
  }
  
  .search-input {
    width: 100%;
  
    &::placeholder {
      color: $placeholder-text;
    }
  }
  </style>
  