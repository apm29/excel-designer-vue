# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## install windicss
`yarn add -D vite-plugin-windicss windicss`

vite.config.js
```javascript
import WindiCSS from 'vite-plugin-windicss'

export default {
  plugins: [
    WindiCSS(),
  ],
}
```

`import 'virtual:windi.css'`

## install pinia

`yarn add pinia`

在入口文件配置
```javascript
import { createPinia } from 'pinia'

app.use(createPinia())
```

定义store
```JavaScript
import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCounterStore = defineStore('counter', {
	// other options...
	state: () => {
		return {
			// all these properties will have their type inferred automatically
			counter: 0,
		}
	},
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		increment() {
			this.counter++
		},
		randomizeCounter() {
			this.counter = Math.round(100 * Math.random())
		},
	},
})
```

使用store
```Html
<template>
  <div class="text-gray-100 bg-blue-500">
    Home
    {{ counter.counter }}
    <button @click="counter.counter++">+</button>
  </div>
</template>
<script setup>
import { useCounterStore } from "@/store";
const counter = useCounterStore();
</script>
```


## install element-plus

`yarn add element-plus`

引入
```JavaScript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```