<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input ref="input" type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
    </div>
    <div class="search-list-box" v-show="searchSuggest.length > 0">
      <ScrollView>
        <ul class="search-list">
          <li @click="skip(value.id)" v-for="value in searchSuggest" :key="value.id">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{ value.name }}-
              <span v-for="(artist, index) in value.artists" :key="artist.id">
            <span v-if="index === 0">{{ artist.name }}</span>
            <span v-else>、{{ artist.name }}</span>
          </span>
            </p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="hot-search">
      <h4>热门搜索</h4>
      <ul>
        <li @click="clickSearch(value.first)" v-for="value in hotSearch" :key="value.first">{{ value.first }}</li>
      </ul>
    </div>
    <ul class="search-history" v-if="historySearch.length > 0">
      <li v-for="(value, index) in historySearch"
          :key="value" @click="historySearchData(value)">
        <div class="left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{ value }}</p>
        </div>
        <div class="right" @click="delHistory(index)">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchSuggest, getHotSearch } from '../api/networkClass'
import ScrollView from './../components/Scroll/ScrollView'
import { mapGetters, mapActions } from 'vuex'
import MetaInfo from './../../vue-meta-info'
export default {
  metaInfo: MetaInfo.search,
  name: 'Search',
  data () {
    return {
      keywords: '',
      searchSuggest: [],
      hotSearch: [],
      historySearch: []
    }
  },
  methods: {
    ...mapActions([
      'setSongs',
      'setIsNormalPlay'
    ]),
    search: function () {
      if (this.keywords.trim()) {
        // 发送请求
        getSearchSuggest(this.keywords)
          .then(res => {
            let data = res.result
            if (data.songs) {
              this.searchSuggest = data.songs
            }
          })
          .catch(e => console.log(e))
      } else {
        this.searchSuggest.splice(0, this.searchSuggest.length)
      }
    },
    clickSearch: function (val) {
      this.keywords = val
      this.search()
    },
    skip: function (id) {
      // 获取网络数据
      this.setSongs([id])
      this.setIsNormalPlay(true)
    },
    delHistory: function (index) {
      this.historySearch.splice(index, 1)
    },
    historySearchData: function (val) {
      this.keywords = val
      this.search()
    }
  },
  directives: {
    throttle: {
      inserted: function (el, obj) {
        let timer = null
        el.addEventListener('input', function () {
          if (timer) return
          timer = setTimeout(function () {
            obj.value()
            timer = null
          }, 1000)
        })
      }
    }
  },
  components: {
    ScrollView
  },
  watch: {
    getSongs: function () {
      let keywords = this.keywords.trim()
      if (keywords) {
        let res = this.historySearch.filter(value => {
          return keywords !== value
        })
        res.unshift(keywords)
        this.historySearch = res
        this.keywords = ''
        this.searchSuggest.splice(0, this.searchSuggest.length)
      }
    },
    historySearch: function (newValue, oldValue) {
      let strArray = JSON.stringify(newValue)
      localStorage.setItem('searchHistory', strArray)
    }
  },
  created () {
    getHotSearch()
      .then(res => {
        if (res.result.hots) {
          this.hotSearch = res.result.hots
        }
      })
      .catch(e => console.log(e))
    // 回显历史数据
    let strArray = localStorage.getItem('searchHistory')
    if (!strArray) return
    let history = JSON.parse(strArray)
    this.historySearch.push(...history)
  },
  computed: {
    ...mapGetters([
      'getSongs'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/mixin";
  @import "./../assets/css/variable";
  .search {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include set_sub_bgColor();
    .search-box {
      margin: 20px 60px;
      height: 60px;
      display: flex;
      justify-content: start;
      align-items: center;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.8);
      padding: 0 20px;
      border-radius: 30px;
      img {
        width: 45px;
        height: 45px;
      }
      input {
        height: 100%;
        margin: 0 40px;
        flex: 1;
        outline: none;
        border: none;
        background: transparent;
        @include set_fontSize($font_small);
        color: #666666;
      }
    }
    .search-list-box {
      z-index: 99999;
      position: absolute;
      left: 0;
      top: 90px;
      bottom: 0;
      right: 0;
      @include set_sub_bgColor();
      ul {
        padding: 20px 70px;
        box-sizing: border-box;
        width: 100%;
        li {
          width: 100%;
          display: flex;
          height: 70px;
          justify-content: start;
          align-items: center;
          img {
            width: 45px;
            height: 45px;
            margin-right: 20px;
          }
          p {
            flex: 1;
            @include no_wrap();
            @include set_fontSize($font_medium_s);
            @include set_font_color()
          }
        }
      }
    }
    .hot-search {
      position: relative;
      z-index: 666;
      margin-top: 40px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      h4 {
        @include set_fontSize($font_medium_s);
        @include set_font_color();
      }
      ul {
        margin-top: 20px;
        width: 100%;
        @include set_font_color();
        li {
          display: inline-block;
          padding: 0 20px;
          @include set_fontSize($font_small);
          border: 1px solid #cccccc;
          height: 50px;
          border-radius: 25px;
          line-height: 50px;
          margin: 10px 15px;
        }
      }
    }
    .search-history {
      padding: 30px 50px;
      box-sizing: border-box;
      margin-top: 20px;
      width: 100%;
      li {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #cccccc;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
            margin-right: 20px;
          }
          p {
            @include set_font_color();
            @include set_fontSize($font_small);
          }
        }
        .right {
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>
