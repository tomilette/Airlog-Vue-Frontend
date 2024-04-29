<template>
  <div class="app-container">
    <div class="filter-container" style="float: right;">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="handleUpload">
        Upload Logs
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="JUMP#" width="80" align="center" @dblclick="handleUpdate(row)">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.jump }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="120px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time" width="90px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.timestamp | parseTime('{h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PLACE" width="110px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.place }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AIRCRAFT" width="100px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.aircraft }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAX ALT" width="90px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.max_alt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAX SPD" width="90px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.max_spd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DISCIPLINE" width="100px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.discipline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DESCRIPTION" width="160px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Image" width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.image }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Video" width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.video }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TRACK" width="100px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @dblclick="handleUpdate(row)" @click="goTrackView(row)">{{ row.track }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="primary" size="mini" icon="el-icon-download" @click="handleDownload(row)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="`LogData Detail`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="Log Number:" prop="number">
          <el-input v-model="temp.jump" readonly />
        </el-form-item>
        <el-form-item label="Log Place:">
          <el-input v-model="temp.place" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Aircraft:">
          <el-input v-model="temp.place" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Discipline: ">
          <el-select v-model="temp.discipline" class="filter-item" placeholder="Please select">
            <el-option v-for="item in disciplineOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Jump Images: ">
          <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
        </el-form-item>
        <el-form-item label="Jump Description: ">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateData()">
          Save
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Dropzone from '@/components/Dropzone'

export default {
  name: 'LogBook',
  components: { Pagination, Dropzone },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      disciplineOptions: ['Discipline', 'CRW', 'FF', 'RW', 'Wing', 'Atmo', 'CP', 'Base', 'Video'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = [
          {
            'jump': '1',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'track': '220806.gpx',
            'image': '',
            'video': ''
          },
          {
            'jump': '2',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'track': '220806.gpx',
            'image': '',
            'video': ''
          },
          {
            'jump': '3',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '4',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '5',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '6',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '7',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '8',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '9',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '10',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          },
          {
            'jump': '11',
            'timestamp': '2021-03-01 21:23:21',
            'place': 'wesdan',
            'aircraft': 'DFOYO',
            'max_alt': '4014m',
            'max_spd': '70.1',
            'discipline': 'RW',
            'description': 'Jump description - with Widn',
            'image': '',
            'video': '',
            'track': '220806.gpx'
          }
        ]
        this.total = 11

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    goTrackView(row) {

    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload(row) {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    handleUpload() {
      this.$message({
        message: 'Coming soon!',
        type: 'warning',
        duration: 5 * 1000
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
