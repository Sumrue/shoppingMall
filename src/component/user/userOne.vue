<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  calss="card-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userData" border> <!-- 表格绑定数据 prop传递具体数据 -->
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="姓名" prop="username" align="center"></el-table-column>
        <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
        <el-table-column label="电话" prop="phone" align="center"></el-table-column>
        <el-table-column label="角色" prop="role_name" align="center"></el-table-column>
        <el-table-column label="状态" prop="mg_state" align="center">
           <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userChange(scope.row.mg_state)"><!-- 通过switch 的监听事件，监听发生变化时传入变化的值,然后将更改的数据发送给数据库，然后更新-->
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="success" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip  effect="dark" content="分配角色" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagename"
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="80">
      </el-pagination>
    </el-card>

    <!-- // 添加用户弹出框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      @close="closeBoox"
      width="30%">
      <el-form ref="addForm" label-width="80px" :rules="rules" :model="formData">
        <el-form-item label="用户名" prop="name"><!-- 此处prop对应的是规则名称与双向绑定的相同 -->
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="formData.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input v-model="formData.pass2" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="restForm">重置</el-button>
          <el-button type="primary" @click="addUser">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // 定义检验密码的方法
    var pass = (rule, value, callback) => { // 此为自定义的方法，在rules中相对应的项中 用validator调用
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.pass2 !== '') {
          this.$refs.addForm.validateField('pass2') // calidateField 表示对表单部分进行校验，而validate是全校验，addForm为这个表单引用对象
        }
        callback()
      }
    }
    // 定义检验二次输入的密码的方法
    var pass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 定义检验点好号码的方法
    var cheackPhone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的电话号码'))
      } else {
        callback()
      }
    }
    return {
      userData: [], // 用户数据
      pagename: 1, // 当前页的页码
      dialogVisible: false,
      formData: { // 表单数据
        name: '',
        pass: '',
        pass2: '',
        email: '',
        phone: ''
      },
      rules: {
        name: [ // 表单检验项中 检验规则中的name与输入框中双向绑定的name相同
          { required: true, message: '用户名不能为空', trigger: 'blur' }, // 匹配不能为空时的规则  required: tru 为表格前的红心必填项指示
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: pass, trigger: 'blur' } // validator: pass  pass 为自定义的检验方法
        ],
        pass2: [
          { required: true, validator: pass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          {validator: cheackPhone, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.userDataGet()
  },
  methods: {
    // 用户数据请求
    userDataGet () {
      this.$api.modleOne.userDataGet().then(res => {
        this.userData = res.data
        console.log(this.userData)
      })
    },
    // 监听每页多少条
    handleSizeChange (newSize) {
      console.log(newSize)
    },
    // 监听当前页有多少条
    handleCurrentChange (val) {
      console.log(val)
    },
    // 监听用户状态开关
    userChange (val) {
      console.log(val)
    },
    // 添加用户提交数据
    addUser () {
      // addForm为整个表单的引用对象 ，在表单开头定义 ref="addForm" 在方法validate中返回的值，即value是一个boole值
      this.$refs.addForm.validate((value) => {
        if (!value) {
          this.tipMessage('用户添加失败，请填写正确的用户信息', 'warning', 5000)
        } else {
          this.tipMessage('用户添加成功', 'success', 5000)
          // 用户信息添加成功后清空表单信息
          console.log(this.formData)
          this.closeBoox()
        }
      })
    },
    // 关闭添加用户的对话框后，重置表单的功能
    closeBoox () {
      this.$refs.addForm.resetFields()
    },
    // 重置按钮重置表单
    restForm () {
      this.closeBoox()
    },
    tipMessage (msg, type, time) {
      this.$message({
        message: msg,
        type: type,
        duration: time
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px
}

.card-select {
  width: 200px
}

.el-table {
  margin-top: 15px;
}
</style>
