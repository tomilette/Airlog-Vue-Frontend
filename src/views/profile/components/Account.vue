<template>
  <el-form>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="User Name">
          <el-input v-model.trim="user.name" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Address">
          <el-input v-model.trim="user.address" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Email">
          <el-input v-model.trim="user.email" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Callsign">
          <el-input v-model.trim="user.nickname" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Phone">
          <el-input v-model.trim="user.phone" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="License">
          <el-input v-model.trim="user.license" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Emergency Phone">
          <el-input v-model.trim="user.emergency_phone" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Emergency Contract">
          <el-input v-model.trim="user.emergency_contract" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Main Canopy">
          <el-input v-model.trim="user.main_canopy" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Container">
          <el-input v-model.trim="user.container" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Suit">
          <el-input v-model.trim="user.suit" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Reserve">
          <el-input v-model.trim="user.reserve" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Weight">
          <el-input v-model.trim="user.weight" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Raitings">
          <el-input v-model.trim="user.raitings" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Jump#">
          <el-input v-model.trim="user.jump" />
        </el-form-item>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-form-item label="Timezone">
          <el-input v-model.trim="user.timezone" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  directives: { elDragDialog },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          address: '',
          phone: '',
          emergency_phone: '',
          emergency_contract: '',
          main_canopy: '',
          suit: '',
          jump: '',
          license: '',
          nickname: '',
          container: '',
          reserve: '',
          weight: '',
          raitings: '',
          timezone: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
