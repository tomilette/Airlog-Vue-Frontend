<template>
  <el-form>
    <aside>
      EXPERIMENTAL AUDIBLE ALARMS
      <el-button style="float: right;" type="normal" @click="showDetail">
        AudALM
      </el-button>
      <template v-if="isHidden">
        <el-row :gutter="20">
          <el-col :span="8" :xs="24">
            <el-form-item label="alarm 1 altitude [m]">
              <el-input v-model.trim="info.alarm1_altitude" />
            </el-form-item>
          </el-col>

          <el-col :span="4" :xs="24">
            <el-form-item label="sound:">
              <el-select ref="select" v-model="info.sound1" style="width: 100%;">
                <el-option v-for="item in sound_items" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :xs="24">
            <el-form-item label="alarm 2 altitude [m]">
              <el-input v-model.trim="info.alarm2_altitude" />
            </el-form-item>
          </el-col>

          <el-col :span="4" :xs="24">
            <el-form-item label="sound:">
              <el-select ref="select" v-model="info.sound2" style="width: 100%;">
                <el-option v-for="item in sound_items" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </aside>
  </el-form>
</template>

<script>
export default {
  name: 'AudibleAlarms',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          alarm1_altitude: '',
          sound1: '',
          alarm2_altitude: '',
          sound2: ''
        }
      }
    }
  },
  data() {
    return {
      isHidden: false,
      sound_items: ['off', 'dit-dit', 'dit-dat', 'dit-dat-dit']
    }
  },
  methods: {
    showDetail() {
      this.isHidden = !this.isHidden
    }
  }
}
</script>
