<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="userAuthData" border stripe>
        <el-table-column type="expand">
           <template slot-scope="scope">
            {{scope.row}}
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="角色名称" prop="rolename" align="center"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" align="center"></el-table-column>
        <el-table-column label="操作" width="400px" align="center">
          <el-button icon="el-icon-edit" type="primary">编辑</el-button>
          <el-button icon="el-icon-delete" type="danger">删除</el-button>
          <el-button icon="el-icon-setting" type="warning">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userAuthData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 角色列表数据请求
    getData () {
      this.$api.modleOne.userAuthListGet().then(res => {
        this.userAuthData = res.data
      })
    }
  }
}
</script>

<style>

</style>
