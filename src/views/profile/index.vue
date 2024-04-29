<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Account" name="account">
              <account :user="user" />
            </el-tab-pane>
            <el-tab-pane label="Device" name="device">
              <device />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
import Account from './components/Account'
import Device from './components/Device'

export default {
  name: 'Profile',
  components: { Account, Device },
  data() {
    return {
      user: {},
      device: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
    this.getDevice()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    },

    getDevice() {
      this.device = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path === '/profile/index') {
        if (to.query.activeTab === 'device') {
          vm.activeTab = 'device' // Set the active tab to 'device' if query parameter is present
        }
      }
    })
  }
}
</script>
