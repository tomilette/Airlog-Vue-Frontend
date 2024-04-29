<template>
  <el-form>
    <aside>
      EXPERIMENTAL REMOTE TARGET POINT
      <el-button style="float: right;" type="normal" @click="showDetail">
        RemDZ
      </el-button>
      <template v-if="isHidden">
        <el-row :gutter="20">
          <el-col :span="12" :xs="24">
            <el-form-item label="Tgt LAT [deg.dec]">
              <el-input v-model.trim="device.tag_lat" />
            </el-form-item>
          </el-col>

          <el-col :span="12" :xs="24">
            <el-form-item label="Tgt LON [deg.dec]">
              <el-input v-model.trim="device.tgt_lon" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :xs="24">
            <el-form-item label="QNH [mbar]">
              <el-input v-model.trim="device.qnh" />
            </el-form-item>
          </el-col>

          <el-col :span="12" :xs="24">
            <el-form-item label="DZ altitude [m]">
              <el-input v-model.trim="device.dz_altitude" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </aside>
  </el-form>
</template>

<script>
export default {
  name: 'RemoteTargetPoint',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          tag_lat: '',
          tgt_lon: '',
          qnh: '',
          dz_altitude: ''
        }
      }
    }
  },
  data() {
    return {
      isHidden: false
    }
  },
  methods: {
    showDetail() {
      this.isHidden = !this.isHidden
    }
  }
}
</script>
