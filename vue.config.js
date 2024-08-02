const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    // Удаляем предыдущее правило для svg
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    // Добавляем новое правило для обработки svg с помощью vue-svg-loader
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
});