(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-works-works"],{3166:function(t,i,e){"use strict";var a,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"works"},[e("appHeader",{attrs:{option:"personal",title:"我的作品"}}),e("v-uni-view",{staticClass:"ps-works-box"},[t.pageList.length?e("v-uni-view",{staticClass:"ps-works-list"},t._l(t.pageList,(function(i,a){return e("v-uni-view",{key:a,staticClass:"ps-w-list-item"},[e("v-uni-view",{staticClass:"w-list-item-left"},[e("v-uni-view",{staticClass:"item-left-img"},[e("v-uni-image",{attrs:{src:i.url}})],1),e("v-uni-view",{staticClass:"item-left-text"},[t._v(t._s(i.name))])],1),e("v-uni-view",{staticClass:"w-list-item-right"},[e("v-uni-picker",{attrs:{range:t.op.opArray},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.operationChange(e,i.id)}}},[e("v-uni-view",{staticClass:"iconfont icon-dian"})],1)],1)],1)})),1):e("v-uni-view",{staticClass:"not-works"},[e("v-uni-view",{staticClass:"title"},[t._v("暂无作品，去"),e("v-uni-navigator",{staticClass:"zhizuo",attrs:{url:"/pages/index/spread/spread","open-type":"switchTab"}},[t._v("制作")])],1),e("v-uni-view",{staticClass:"iconfont icon-empty"})],1)],1)],1)},s=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return a}))},"923f":function(t,i,e){"use strict";e("4160"),e("a434"),e("159b"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;e("2f62");var a={data:function(){return{pageList:[],op:{opIndex:0,opArray:["编辑","删除"]}}},onShow:function(){this.initLocalPageList()},methods:{operationChange:function(t,i){var e=this,a=t.detail.value;0===a?uni.navigateTo({url:"/pages/poster/edit-poster/index?id=".concat(i,"&type=edit")}):1===a&&(this.pageList.forEach((function(t,a){t.id==i&&e.pageList.splice(a,1)})),localStorage.setItem("localPageList",JSON.stringify(this.pageList)))},initLocalPageList:function(){var t=localStorage.getItem("localPageList");t&&(this.pageList=JSON.parse(t))}}};i.default=a},a50a:function(t,i,e){"use strict";e.r(i);var a=e("923f"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);i["default"]=n.a},fad4:function(t,i,e){"use strict";e.r(i);var a=e("3166"),n=e("a50a");for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);var o,r=e("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"48e3887d",null,!1,a["a"],o);i["default"]=u.exports}}]);