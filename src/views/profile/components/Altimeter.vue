<template>
  <div class="app-container">
    <el-form>
      <aside>
        ALTIMETER
        <el-badge :is-dot="true" style="line-height: 25px;float: right;" @click.native="dialogTableVisible=true">
          <el-button size="small" type="normal" style="font-style: italic;">
            v2.0.0
          </el-button>
        </el-badge>
      </aside>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item label="Altitude Units">
            <el-select ref="select" v-model="info.altitude_unit" style="width: 100%;">
              <el-option v-for="item in altitude_items" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="Speed Units">
            <el-select ref="select" v-model="info.speed_unit" style="width: 100%;">
              <el-option v-for="item in speed_items" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item label="Temperature Units">
            <el-select ref="select" v-model="info.temperature_unit" style="width: 100%;">
              <el-option v-for="item in temperature_items" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="Distance Units">
            <el-select ref="select" v-model="info.distance_unit" style="width: 100%;">
              <el-option v-for="item in distance_items" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item label="Serial Numbers:">
            <el-input v-model.trim="info.serial_numbers" type="text" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="Packing Dates:">
            <el-input v-model.trim="info.packing_dates" type="date" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item label="Sunlight Refresh:">
            <el-input v-model.trim="info.sunlight_refresh" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :xs="20">
          <el-checkbox v-model="info.metric" class="filter-item">
            Metric (deprecated)
          </el-checkbox>
        </el-col>
        <el-col :span="4" :xs="20">
          <el-checkbox v-model="info.get_wind_info" class="filter-item">
            Get Wind Info
          </el-checkbox>
        </el-col>
        <el-col :span="4" :xs="20">
          <el-checkbox v-model="info.chest_mount" class="filter-item">
            Chest Mount (fixed)
          </el-checkbox>
        </el-col>
        <el-col :span="4" :xs="20">
          <el-checkbox v-model="info.mono_font" class="filter-item">
            Mono font
          </el-checkbox>
        </el-col>
        <el-col :span="4" :xs="20">
          <el-checkbox v-model="info.show_density_alt" class="filter-item">
            Show density alt
          </el-checkbox>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 15px;">
        <el-col :span="18" :xs="24">
          <el-form-item label="Special Commands:">
            <el-input v-model.trim="info.special_commands" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="Version history" @dragDialog="handleDrag">
      <el-table :data="gridData">
        <el-table-column align="center" label="Version" width="200">
          <template slot-scope="{row}">
            <span>{{ row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Released Date" width="200">
          <template slot-scope="{row}">
            <span>{{ row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Status">
          <template slot-scope="{row}">
            <template v-if="row.status == 1">
              <el-button size="small" type="success" @click="update(row)">
                Update
              </el-button>
            </template>
            <template v-if="row.status == 0">
              <span>Current version</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'Altimeter',
  directives: { elDragDialog },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          altitude_unit: '',
          speed_unit: '',
          temperature_unit: '',
          distance_unit: '',
          metric: '',
          get_wind_info: '',
          chest_mount: '',
          mono_font: '',
          show_density_alt: '',
          sunlight_refresh: '',
          serial_numbers: '',
          packing_dates: '',
          special_commands: ''
        }
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      gridData: [{
        version: '2.0.1',
        date: '2019-04-22',
        status: '1'
      }, {
        version: '2.0.0',
        date: '2018-02-15',
        status: '0'
      }, {
        version: '1.0.1',
        date: '2017-07-03',
        status: '-1'
      }, {
        version: '1.0.0',
        date: '2016-05-03',
        status: '-1'
      }],
      is_active: {
        get() {
          return this.is_active
        },
        set(val) {
          this.is_active = !this.is_active
        }
      },
      altitude_items: ['m', 'ft'],
      speed_items: ['m/s', 'km/h', 'mph', 'kts'],
      temperature_items: ['C', 'F'],
      distance_items: ['km', 'mi']
    }
  },
  methods: {
    update(row) {
      this.$message({
        message: 'Successfully updated to recent version ' + row.version,
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
