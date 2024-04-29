<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div style="position:relative;">
      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header"><svg-icon icon-class="guide" /><span>Last Jump</span></div>
          <router-link to="/trackview/index">
            <div class="user-bio-section-body">
              <div class="text-muted distance">
                4,014 m
              </div>
              <div class="text-muted date">
                2022-08-06 @ 14:34
              </div>
              <div class="text-muted place">
                Gransee
              </div>
            </div>
          </router-link>
        </div>

        <div class="user-skills user-bio-section" style="margin-top: 25px;">
          <div class="user-bio-section-header"><svg-icon icon-class="component" /><span> Device Status</span></div>
          <router-link :to="{ path: '/profile/index', query: { activeTab: 'device' } }">
            <div class="user-bio-section-body">
              <div class="progress-item">
                <span>Battery</span>
                <el-progress :percentage="70" />
              </div>
              <div class="progress-item">
                <span>SD Card</span>
                <el-progress :percentage="18" />
              </div>
              <div class="version" style="margin-top: 20px;">
                <span>v1.1.1</span>
                <span style="float: right; color: #13ce66;" class="success">New version available</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
// import PanThumb from '@/components/PanThumb'
// import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  // components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    ::v-deep .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}

.user-bio {
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .user-bio-section-body {
      .distance {
        font-size: 35px;
        text-align: center;
        margin: 10px 0;
      }
      .date, .place{
        font-size: 18px;
        text-align: center;
        margin-top: 5px;
      }
    }
  }
}
</style>
