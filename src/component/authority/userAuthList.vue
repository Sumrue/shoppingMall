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
            <el-row v-for="(item,i1) in scope.row.children" :key="i1" :class="['bdbottom', i1 === 0 ? 'bdtop' : '']">
              <el-col :span="6">
                <el-tag closable @close="tipMsg">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <el-row v-for="(scLevel,i2) in item.children" :key="i2" :class="[i2 ===0 ? '' : 'bdtop']">
                  <el-col :span="8">
                    <el-tag type="success" closable @close="tipMsg">{{scLevel.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag v-for="(thLevel,i3) in scLevel.children" :key="i3" type="warning" closable @close="tipMsg">{{thLevel.smallAuthName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="角色名称" prop="rolename" align="center"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" align="center"></el-table-column>
        <el-table-column label="操作" width="400px" align="center">
          <el-button icon="el-icon-edit" type="primary">编辑</el-button>
          <el-button icon="el-icon-delete" type="danger">删除</el-button>
          <el-button icon="el-icon-setting" type="warning" @click="dialogVisible = true">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-tree :data="userAuthAll" :props="defaultProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userAuthData: [], // 角色列表数据
      userAuthAll: [],
      dialogVisible: false, // 控制分配权限对话框的显示隐藏
      defaultProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  created () {
    this.getData()
    this.userAuthAllData()
  },
  methods: {
    // 角色列表数据请求
    getData () {
      this.$api.modleOne.userAuthListGet().then(res => {
        this.userAuthData = res.data
      })
    },
    // 角色权限确认框弹出
    tipMsg () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功! 哇咔咔'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除，哇咔咔'
        })
      })
    },
    userAuthAllData () {
      this.$api.modleOne.userAuthListAllGet().then(res => {
        this.userAuthAll = res.data
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}

.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
