
import { UPDATE_PAGE_INFO,ADD_CONTENT,CHANGE_COORDINATE,EDIT_INDEX ,UPDATE_CONTENT_DETAIL,UPDATE_POSTER,UPDATE_CONTENT} from './mutation-types.js'
import Vue from 'vue'
export default{
	[ADD_CONTENT](state,{content}){
		// console.log(state)
		// console.log(content)
		let len = state.pageInfo.content.length
		state.pageInfo.content.splice(len,1,content)
	},
	[UPDATE_PAGE_INFO](state,{pageInfo}){
		state.pageInfo = pageInfo
	},
	[CHANGE_COORDINATE](state,{index, x,y }){
		state.pageInfo.content[index].detail.x = x
		state.pageInfo.content[index].detail.y = y
	},
	[EDIT_INDEX](state,index){
		state.editIndex = index
	},
	// 更新属性
	[UPDATE_CONTENT_DETAIL](state,{key,value}){
		let index = state.editIndex
		state.pageInfo.content[index].detail[key] = value
	},
	[UPDATE_CONTENT](state,{key,value}){
		state.pageInfo.detail[key] = value
	},
	[UPDATE_POSTER](state,url){
		state.posterUrl = url
	}
}