
import { UPDATE_PAGE_INFO,ADD_CONTENT,CHANGE_COORDINATE,EDIT_INDEX ,UPDATE_CONTENT_DETAIL,UPDATE_POSTER,UPDATE_CONTENT,DEL_CONTENT,COPY_CONTENT} from './mutation-types.js'
import Vue from 'vue'
export default{
	[UPDATE_PAGE_INFO](state,{pageInfo}){
		state.pageInfo = pageInfo
	},
	[EDIT_INDEX](state,index){
		state.editIndex = index
	},
	[UPDATE_CONTENT](state,{key,value}){
		state.pageInfo.detail[key] = value
	},
	[UPDATE_POSTER](state,url){
		state.posterUrl = url
	}
}