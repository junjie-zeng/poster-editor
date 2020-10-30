import { UPDATE_PAGE_INFO,ADD_CONTENT,CHANGE_COORDINATE ,EDIT_INDEX,UPDATE_ATTR_VALUE,UPDATE_POSTER} from './mutation-types.js'

export default{
	addContent({commit,state},content){
		commit(ADD_CONTENT,{content})
	},
	updatePageInfo({commit,state}){
		console.log('action updatePageInfo...')
		let {pageInfo} = state
		pageInfo.content.forEach((item)=>{
			item.detail.x = item.detail.cx
			item.detail.y = item.detail.cy
			return item
		})
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	changeCoordinate({commit,state},{index,x,y}){
		// console.log(index)
		// console.log(state.pageInfo.content)
		commit(CHANGE_COORDINATE,{index,x,y})
	},
	setEditIndex({commit,state},index){
		commit(EDIT_INDEX,index)
	},
	updateAttrValue({commit},{key,value}){
		commit(UPDATE_ATTR_VALUE,{key,value})
	},
	setPosterUrl({commit},url){
		commit(UPDATE_POSTER,url)
	}
}