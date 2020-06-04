<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="40px">
      <div id="header-left">
        <i class="el-icon-sunrise-1"></i>
        <span>我的站点</span>
      </div>
      <div>
        <el-button type="primary">登录</el-button>
        <el-button type="info">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px">
        <el-menu unique-opened router :default-active= "menuActive">
          <!-- 菜单管理 -->
          <el-submenu :index="menuData.menu" v-for="(menuData, index) in menuData" :key="index">
            <template slot="title">
              <i :class="menuIcon[menuData.id - 1]"></i> <!-- 动态赋值改变小图标 -->
              <span>{{menuData.menu}}</span>
            </template>
              <el-menu-item v-for="(menuItemData,item) in menuData.menuItem" :key="item" :index="menuItemPath[index][item]">
                <i class="el-icon-dessert"></i>
                  {{menuItemData}}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主题部分 -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  metaInfo: { // 配置每个页面的TDK  引用了插件
    title: '首页',
    meta: [
      {
        name: 'keyworlds',
        content: '首页,官网首页'
      },
      {
        name: 'description',
        content: '这是首页的描述信息'
      }
    ]
  },
  data () {
    return {
      menuData: [], // 一级菜单数据
      menuItemData: [], // 二级菜单数据
      menuIcon: [ // 动态绑定的一级菜单前的小图标
        'el-icon-sunrise-1',
        'el-icon-mobile',
        'el-icon-coordinate',
        'el-icon-reading',
        'el-icon-film'
      ],
      menuItemPath: [ // 这是每个子菜单所匹配的路由path,
        ['user'], // 需要在router当中创建匹配的路由路径， 因为elementUI menu Router的机制，
        ['user12', 'user22', 'user32', 'user42'], // 用上层循环的index和子菜单循环的item来动态引用此处的path数据
        ['user13', 'user21', 'user31', 'user41'],
        ['user14', 'user21', 'user31', 'user41'],
        ['user15', 'user21', 'user31', 'user41']
      ],
      menuActive: '' // 当前菜单栏绑定的高亮显示数据
    }
  },
  created () {
    this.httpMenu() // 菜单数据请求
    this.menuActiveData()
  },
  methods: {
    httpMenu () {
      this.$api.modleOne.menuGet().then(res => { // 菜单数据后台请求
        this.menuData = res.data[0].data
      })
    },
    menuActiveData () { // 用于在子菜单高亮显示时，是为了配合监听路由改变高亮时，刷新页面时无法高亮显示的问题
      let activePath = this.$route.path
      this.menuActive = activePath.replace('/', '') // 将去除 ’/‘后的路由地址字符串赋值给menuActive ，用于当前菜单栏的高亮显示
    }
  },
  watch: {
    '$route.path' (newUrl, oldUrl) { // 监听路由变化
      this.menuActive = newUrl.replace('/', '') // 如果路由变化了，就将去除 ’/‘后的路由地址字符串赋值给menuActive ，用于当前菜单栏的高亮显示
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  padding: 0 0;
  line-height: 40px;
  align-items: center;
}

</style>
