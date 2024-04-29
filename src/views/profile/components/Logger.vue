<template>
  <div class="app-container">
    <el-form>
      <aside>
        LOGGER
        <el-badge :is-dot="false" style="line-height: 25px;float: right;" @click.native="dialogTableVisible=true">
          <el-button size="small" type="normal" style="font-style: italic;">
            v2.0.1
          </el-button>
        </el-badge>
      </aside>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item label="Autostart [m]">
            <el-input v-model.trim="info.autostart" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="Altitude Units">
            <el-select ref="select" v-model="info.fileltype" style="width: 100%;">
              <el-option v-for="item in filetype_items" :key="item" :label="item" :value="item" />
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
  name: 'Logger',
  directives: { elDragDialog },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          autostart: '',
          filetype: '',
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
        status: '0'
      }, {
        version: '2.0.0',
        date: '2018-02-15',
        status: '-1'
      }, {
        version: '1.0.1',
        date: '2017-07-03',
        status: '-1'
      }, {
        version: '1.0.0',
        date: '2016-05-03',
        status: '-1'
      }],
      filetype_items: ['CSV', 'FLS']
    }
  }
}
</script>
