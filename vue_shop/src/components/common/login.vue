<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt />
      </div>

      <!-- 表单区域 -->
      <el-form  ref="loginFormRef" :model="LoginFrom" :rules="rules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="LoginFrom.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="LoginFrom.password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click = 'login'>登录</el-button>
          <el-button type="info" @click = "resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      LoginFrom: {
        username: "admin",
        password: "123456",
      },
      rules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    //重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //表单登录预验证
    login() {
        this.$refs.loginFormRef.validate(async valid => {
          if(!valid) return;
          const {data : res} =await  this.$http.post('/login',this.LoginFrom);
          console.log(res)
          if(res.meta.status !== 200) return  this.$message.error({
            showClose: true,
            message: '用户名或密码错误',
            duration : 800,
        });
        //成功后的弹窗
          this.$message.success({
            showClose: true,
            message: '登录成功',
            duration : 800,
        });
          //1.将登录成功后的token,保存在客户端的sessionStorage中
          //1.1 项目中除了登录之外的其他接口,只有在登录之后才能访问
          //1,2 token只有在当前网站打开期间生效,所以将token保存在sessionstorage中
          window.sessionStorage.setItem('token',res.data.token)
          //2. 通过编程时导航跳转到后台主页,路由地址时/home
          this.$router.push('/home')

        });
    }
  }
};
</script>

<style lang = 'less' scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  align-items: center;
  justify-content: center;
}
.login-box {
  position: relative;
  width: 450px;
  height: 300px;
  border-radius: 3px;
  background-color: #fff;
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>