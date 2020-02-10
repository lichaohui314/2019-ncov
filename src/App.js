import React, { useState, Suspense, useEffect } from 'react'
import keyBy from 'lodash.keyby'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import all from './data/overall'
import provinces from './data/area'

import Tag from './Tag'

import './App.css'
// import axios from 'axios'

dayjs.extend(relativeTime)
// 地图显示组件
const Map = React.lazy(() => import('./Map'))

const provincesByName = keyBy(provinces, 'name')
// const provincesByPinyin = keyBy(provinces, 'pinyin')


// 头部组件
function Header({ province }) {
  return (
    <header>
      <div className="bg"></div>
      <h1>
        <small>新型冠状病毒</small>
        <br />
        疫情实时动态 · {province ? province.name : '省市地图'}
      </h1>
      <i>By 全栈成长之路</i>
    </header>
  )
}
// 统计
function Stat ({ modifyTime, confirmedCount, suspectedCount, deadCount, curedCount, name }) {
  return (
    <div className="card">
      <h2>
        统计 {name ? `· ${name}` : false}
        <span className="due">
          截止时间: {dayjs(modifyTime).format('YYYY-MM-DD HH:mm')}
        </span>
      </h2>
      <div className="row">
        <Tag number={confirmedCount}>
          确诊
        </Tag>
        <Tag number={suspectedCount || '-'}>
          疑似
        </Tag>
        <Tag number={deadCount}>
          死亡
        </Tag>
        <Tag number={curedCount}>
          治愈
        </Tag>
      </div>
    </div>
  )
}


// 整体组件
function App() {
  const [province, _setProvince] = useState(null);

  const setProvince = (p) => {
    _setProvince(p)
    window.history.pushState(null, null, p ? p.pinyin : '/')
  }

  const data = !province ? provinces.map(p => ({
    name: p.provinceShortName,
    value: p.confirmedCount
  })) : provincesByName[province.name].cities.map(city => ({
    name: city.fullCityName,
    value: city.confirmedCount
  }))

  const overall = province ? province : all

  return (
    <div className="App">
      <Header />
      <Stat { ...overall } name={province && province.name} modifyTime={all.modifyTime}/>
      <div className="card">
      <h2>疫情地图 { province ? `· ${province.name}` : false }
        {
          province ? <small
            onClick={() => setProvince(null)}
          >返回全国</small> : null
        }
        </h2>
        <Suspense fallback={<div className="loading">地图正在加载中...</div>}>
          <Map province={province} data={data} onClick={name => {
            const p = provincesByName[name]
            console.log(p)
            if (p) {
              setProvince(p)
            }
          }}/>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
