# Vuex  axios element-ui
此项目是为做项目时准备的基础项目 用的是elementUI组件库
1.封装了axios请求。模块化，多个默认网址请求，断网处理
2.配置了vuex
3.用按需引入配置了 element // 在assets下plugins文件夹中配置引入

封装的axios是具有模块化的，可供多人开发，避免开发时多人使用一个输出接口文件，默认网址列表在’axios/api/base.js' 中更改
更改模块和加入模块也是在'axios/api/' 文件夹中的index.js 中更改，新加入的模块要导入此文件中


// npm install时，可能会报错，此时需要执行 npm install npm --save

// 配置elementUi按需引入时，注意两个插件安装命令

npm install babel-preset-es2015 --save-dev
npm install babel-plugin-component -D
这两个命令是按需引入的关键，不然会项目可能报错