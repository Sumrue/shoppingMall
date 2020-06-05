<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="authorityListData" border stripe>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="权限名称" align="center" prop="authName"></el-table-column>
        <el-table-column label="路径" align="center" prop="path"></el-table-column>
        <el-table-column label="权限等级" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '1'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '2'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      authorityListData: [] // 权限管理数据
    }
  },
  created () {
    this.getData() // 调用请求权限管理数据方法
  },
  methods: {
    // 请求权限管理数据
    getData () {
      this.$api.modleOne.authorityListGet().then(res => {
        this.authorityListData = res.data
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
</style>
