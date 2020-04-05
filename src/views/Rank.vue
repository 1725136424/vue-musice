<template>
  <div class="rank">
    <ScrollView>
      <ul class="big-group">
        <li v-for="(value, key) in rank.titles" :key="key">
          <p class="title">{{ value }}</p>
          <ul class="small-group" :class="{'authority': value === '官方榜',
          'others': value !== '官方榜'}">
            <li v-for="item in rank[key]" :key="item.id" @click.stop="skip(item.id)">
              <div v-if="value === '官方榜'">
                <div class="left">
                  <img v-lazy="item.ranks.coverImgUrl" alt="">
                  <span>{{item.ranks.updateFrequency}}</span>
                </div>
                <div class="right">
                  <p v-for="(desc, index) in item.ranks.tracks" :key="desc.first">
                    {{ index + '. ' + desc.first + '-' + desc.second }}
                  </p>
                </div>
              </div>
              <div v-else>
                <div class="top">
                  <img v-lazy="item.ranks.coverImgUrl" alt="">
                  <span>{{item.ranks.updateFrequency}}</span>
                </div>
                <div class="bottom">
                  <p>{{ item.ranks.name }}</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllRank } from '../api/networkClass'
import ScrollView from './../components/Scroll/ScrollView'
import MetaInfo from './../../vue-meta-info'
export default {
  metaInfo: MetaInfo.rank,
  name: 'Rank',
  data () {
    return {
      rank: []
    }
  },
  components: {
    ScrollView
  },
  created () {
    getAllRank()
      .then(res => {
        this.rank = res
      })
      .catch(e => console.log(e))
  },
  methods: {
    skip: function (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/variable";
  @import "./../assets/css/mixin";
  .rank {
    position: fixed;
    left: 0;
    top: 184px;
    right: 0;
    bottom: 0;
    @include set_sub_bgColor();
    .big-group {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .title {
        @include set_fontSize($font_large);
        @include set_font_color();
        font-weight: bold;
        line-height: 70px;
      }
      .small-group {
        width: 100%;
        &.authority {
          li {
            margin: 15px 0;
            width: 100%;
            &>div {
              display: flex;
              justify-content: start;
              align-items: center;
              .left {
                width: 200px;
                height: 200px;
                margin-right: 20px;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 20px;
                }
                span {
                  position: absolute;
                  bottom: 15px;
                  left: 10px;
                  line-height: 30px;
                  @include set_fontSize($font_small);
                  color: #ffffff;
                }
              }
              .right {
                width: 70%;
                p {
                  line-height: 45px;
                  @include no_wrap();
                  @include set_font_color();
                  @include set_fontSize($font_medium_s)
                }
              }
            }
          }
        }
        &.others {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          li {
            width: 200px;
            height: 250px;
            margin: 15px 0;
            &>div {
              display: flex;
              justify-content: start;
              flex-direction: column;
              .top {
                width: 200px;
                height: 200px;
                margin-right: 20px;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 20px;
                }
                span {
                  position: absolute;
                  bottom: 15px;
                  left: 10px;
                  line-height: 30px;
                  @include set_fontSize($font_small);
                  color: #ffffff;
                }
              }
              .bottom {
                width: 100%;
                p {
                  padding-left: 10px;
                  box-sizing: border-box;
                  width: 100%;
                  @include no_wrap();
                  line-height: 50px;
                  @include set_font_color();
                  @include set_fontSize($font_small)
                }
              }
            }
          }
        }
      }
    }
  }
</style>
