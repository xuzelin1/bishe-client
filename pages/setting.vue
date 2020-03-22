<template>
  <div class="setting-page">
    <Header />
    <div class="container">
      <MyOrder />
      <div class="setting-content">
        <h3>个人信息</h3>
        <p>账户设置</p>
        <div class="content-item clearfix">
          <p class="item-title">头像</p>
          <div class="avatar">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
            <img :src="require('@/assets/images/default-avatar.png')" alt="">
          </div>
          <button class="btn-change" @click="avatarEditVisiable = true">修改</button>
        </div>
        <div class="content-item clearfix">
          <p class="item-title">昵称</p>
          <p class="item-con">{{ userInfo.user }}</p>
          <button class="btn-change" @click="nameEditVisiable = true">修改</button>
        </div>
        <div class="content-item clearfix">
          <p class="item-title">邮箱</p>
          <p class="item-con">{{ userInfo.email }}</p>
          <button class="btn-change" @click="mailEditVisiable = true">修改</button>
        </div>
        <div class="content-item clearfix">
          <p class="item-title">登录密码</p>
          <p class="item-con">安全强度：{{ userInfo.pwdStrengthZh || '弱' }}</p>
          <button class="btn-change" @click="passwordEditVisiable = true">修改</button>
        </div>
      </div>
    </div>

    <!-- 头像修改 -->
    <el-dialog
      width="500px"
      title="头像修改"
      :visible.sync="avatarEditVisiable">
      <el-form
        ref="avatarForm"
        :model="avatarForm"
        :rules="rules">
        <el-form-item label="URL地址：" label-width="120px" prop="avatar">
          <el-input v-model="avatarForm.avatar" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="avatarEditVisiable = false">取 消</el-button>
        <el-button type="primary" @click="changeAvatar">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 昵称修改 -->
    <el-dialog
      width="500px"
      title="昵称修改"
      :visible.sync="nameEditVisiable">
      <el-form
        ref="usernameForm"
        :model="nameForm"
        :rules="rules">
        <el-form-item label="原昵称：" label-width="80px">
          <span>{{ userInfo.user }}</span>
        </el-form-item>
        <el-form-item label="昵称：" label-width="80px" prop="username">
          <el-input v-model="nameForm.username" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nameEditVisiable = false">取 消</el-button>
        <el-button type="primary" @click="changeUsername">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 邮箱修改 -->
    <el-dialog
      width="500px"
      title="邮箱修改"
      :visible.sync="mailEditVisiable">
      <el-form
        ref="emailForm"
        :model="mailForm"
        :rules="rules">
        <el-form-item label="邮箱修改：" label-width="100px" prop="email">
          <el-input v-model="nameForm.email" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mailEditVisiable = false">取 消</el-button>
        <el-button type="primary" @click="changeEmail">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 密码修改 -->
    <el-dialog
      width="500px"
      title="密码修改"
      :visible.sync="passwordEditVisiable">
      <el-form
        :model="passwordForm"
        ref="pwdForm"
        :rules="rules">
        <el-form-item label="原密码：" label-width="100px" prop="pre">
          <el-input v-model="passwordForm.prePassword" autocomplete="on" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" label-width="100px" prop="new">
          <el-input v-model="passwordForm.newPassword" type="password"></el-input>
          <span>密码强度：{{ newpwdStrengthZH }}</span>
        </el-form-item>
        <el-form-item label="确认密码：" label-width="100px" prop="confirm">
          <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordEditVisiable = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      userInfo: {
        _id: '',
        user: '',
        email: '',
      },
      // 头像修改
      avatarEditVisiable: false,
      avatarForm: {
        avatar: '',
      },
      // 昵称修改
      nameEditVisiable: false,
      nameForm: {
        username: '',
      },
      // 密码修改
      newpwdStrengthZH: '弱',
      passwordEditVisiable: false,
      passwordForm: {
        prePassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        avatar: [
          { required: true, message: '请输入头像地址', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        // pre: [
        //   { required: true, message: '请输入原密码', trigger: 'blur' }
        // ],
        // new: [
        //   { required: true, message: '请输入新密码', trigger: 'blur' }
        // ],
        // confirm: [
        //   { required: true, message: '请确认密码', trigger: 'blur' }
        // ],
      },
      // 邮箱修改
      mailEditVisiable: false,
      mailForm: {
        email: '',
      },
    };
  },
  computed: {
    ...mapState('modules/user', [
      'position'
    ]),
    pwdStrengthZh () {
      if (this.userInfo.pwdStrength === 3) {
        return '强';
      }
      if (this.userInfo.pwdStrength === 2) {
        return '中';
      }
      return '弱';
    },
    hardPwdCheck () {
      return this.passwordForm.newPassword;
    },
  },
  mounted () {
    this.getUserInfo();
  },
  watch: {
    hardPwdCheck (value) {
      var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")  //强
      var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g")  //中
      var enoughRegex = new RegExp("(?=.{6,}).*", "g") //弱
      if (strongRegex.test(value)) {
        this.newpwdStrengthZH = '强';
        this.pwdStrength = 3;
      } else if (mediumRegex.test(value)) {
        this.newpwdStrengthZH = '中';
        this.pwdStrength = 2;
      } else if(enoughRegex.test(value)) {
        this.newpwdStrengthZH = '弱';
        this.pwdStrength = 1;
      }
    },
  },
  methods: {
    getUserInfo() {
      this.$axios.get('users/getUser').then(res => {
        this.userInfo = res.data;
      });
    },
    changePassword () {
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          let prePassword = CryptoJS.MD5(this.passwordForm.prePassword).toString()
          let newPassword = CryptoJS.MD5(this.passwordForm.newPassword).toString()
          let confirmPassword = CryptoJS.MD5(this.passwordForm.confirmPassword).toString()
          if(confirmPassword !== newPassword) {
            this.$message({
              message: '两次密码不同',
              type: 'warning'
            });
            return;
          }
          this.$axios.post('users/password', {
            _id: this.userInfo._id,
            prePassword,
            newPassword,
            confirmPassword,
            pwdStrength: this.pwdStrength,
          }).then(res => {
            if(res.data.code == -1) {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            } else {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.passwordForm = {
                prePassword: '',
                newPassword: '',
                confirmPassword: '',
              };
            }
            this.passwordEditVisiable = false;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeAvatar () {
      this.$refs['avatarForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('users/avatar', {
            _id: this.userInfo._id,
            avatar: this.avatarForm.avatar,
          }).then(res => {
            console.log('avatarForm', res);
            this.avatarEditVisiable = false;
            this.getUserInfo();
          })
        } else {
          return false;
        }
      });
    },
    changeUsername () {
      this.$refs['usernameForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('users/username', {
            _id: this.userInfo._id,
            username: this.nameForm.username,
          }).then(res => {
            if(res.status === 200) {
              this.nameEditVisiable = false;
              this.getUserInfo();
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeEmail () {
      this.$refs['emailForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('users/email', {
            _id: this.userInfo._id,
            email: this.mailForm.email,
          }).then(res => {
            this.mailEditVisiable = false;
            this.getUserInfo();
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }

  .setting-page {
    .container {
      margin: 20px auto;
      width: 1190px;

      .setting-content {
        border: 1px solid #E5E5E5;
        border-radius: 4px;
        min-height: 200px;
        width: 888px;
        float: right;
        background: #fff;
        padding: 30px;
        padding-bottom: 0;

        h3 {
          margin: 0;
        }
        p {
          font-size: 14px;
        }

        .content-item {
          padding: 20px 0;
          border-top: 1px solid #E5E5E5;
          height: 60px;

          .item-title {
            margin: 0;
            font-size: 18px;
            border-right: 1px solid #E5E5E5;
            padding-right: 20px;
            padding-left: 40px;
            float: left;
            width: 100px;
            line-height: 60px;
          }

          .avatar {
            float: left;
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 50%;
            margin-left: 30px;
            line-height: 60px;

            img {
              width: 60px;
              height: 60px;
            }
          }

          .item-con {
            line-height: 60px;
            font-size: 16px;
            padding-left: 30px;
            margin: 0;
            float: left;
          }

          .btn-change {
            background: #FFFFFF;
            border: 1px solid #E5E5E5;
            border-radius: 100px;
            font-size: 14px;
            color: #666666;
            float: right;
            height: 40px;
            width: 82px;
            cursor: pointer;
            margin: 0 15px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
  }
</style>