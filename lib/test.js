const {Module} = require('adapt-authoring-core');

/**
* An example authoring tool plugin. Exposes a 'helloworld' API route.
*/
class TestPlugin extends Module {
  /**
  * Creates the custom router
  */
  preload(app, resolve, reject) {
    app.on('app:modulesPreloaded', () => {
      // get module by name and add local function to hook
      const adaptUi = app.moduleloader.moduleMap.get('adapt-authoring-ui');
      adaptUi.hooks.beforeRenderHomeRoute.add(this.promise1);
      adaptUi.hooks.beforeRenderHomeRoute.add(this.promise2);
      adaptUi.hooks.afterRenderHomeRoute.add(this.promise1);
      adaptUi.hooks.afterRenderHomeRoute.add(this.promise2);
    });
    resolve();
  }

  promise1(payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('log 1 from test hook');
        resolve(payload);
      }, 2000);
    });
  }

  promise2(payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('log 2 from test hook');
        resolve(payload);
      }, 2000);
    });
  }

}

module.exports = TestPlugin;
