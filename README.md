# vue-multiple-pages

> A Vue.js multiple pages project template

Base on vue cli 2

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```

## Project dir

``` text
├── build
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── multiple.js         // generate multiple entries webpack dev, pro related config
│   └── prod.env.js
├── package.json
├── src
│   ├── assets
│   ├── components
│   └── pages               // divide pages by multiple modules
│       ├── admin
│       │   ├── App.vue
│       │   ├── index.html  // the template html of this module
│       │   ├── main.js
│       │   ├── vuepage
│       │   └── router
│       └── user
│           ├── App.vue
│           ├── index.html
│           ├── main.js
│           ├── vuepage
│           └── router
└── static
```

## Router config

For multiple pages router, strongly recommend set the `base` property:

``` javascript
export default new Router({
  mode: routerConfig.mode,
  base: '/user/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
```

## Nginx config

If the router mode is `history`, need configure nginx as follow:

``` text
# ...
location /user {
  root html;
  try_files $uri $uri/ /user.html;
}

location /admin {
  root html;
  try_files $uri $uri/ /admin.html;
}
# ...
```
