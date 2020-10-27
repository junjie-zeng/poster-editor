
import { UPDATE_PAGE_INFO,ADD_CONTENT,CHANGE_COORDINATE } from './mutation-types.js'
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
	[CHANGE_COORDINATE](state,{index, cx,cy }){
		state.pageInfo.content[index].detail.x = cx
		state.pageInfo.content[index].detail.y = cy
	}
}