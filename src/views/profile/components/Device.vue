<template>
  <el-form>
    <altimeter />
    <logger />
    <remoteTargetPoint />
    <audibleAlarms />
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Altimeter from './Altimeter'
import Logger from './Logger'
import RemoteTargetPoint from './RemoteTargetPoint'
import AudibleAlarms from './AudibleAlarms'

export default {
  name: 'Device',
  components: { Altimeter, Logger, RemoteTargetPoint, AudibleAlarms },
  props: {
    device: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    submit() {
      this.$message({
        message: 'Device configuration has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
