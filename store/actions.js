import { UPDATE_PAGE_INFO,ADD_CONTENT,CHANGE_COORDINATE ,EDIT_INDEX,UPDATE_CONTENT_DETAIL,UPDATE_POSTER,UPDATE_CONTENT,DEL_CONTENT,COPY_CONTENT,UPDATE_PAGElIST} from './mutation-types.js'

export default{
	addContent({commit,state},content){
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		let len = pageInfo.content.length
		pageInfo.content.splice(len,1,content)
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	delContent({commit,state},index){
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		pageInfo.content.splice(index,1)
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	copyContent({commit,state},index){
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		let len = pageInfo.content.length
		let copyConent = JSON.parse(JSON.stringify(pageInfo.content[index]))
		copyConent.detail.x +=5; 
		copyConent.detail.y +=5; 
		pageInfo.content.splice(len,1,copyConent)
		commit(UPDATE_PAGE_INFO,{pageInfo})
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
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		pageInfo.content[index].detail.x = x
		pageInfo.content[index].detail.y = y
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	scaleElement({commit,state},{index,width,height}){
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		pageInfo.content[index].detail.width = width
		pageInfo.content[index].detail.height = height
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	setEditIndex({commit,state},index){
		commit(EDIT_INDEX,index)
	},
	updateContentDetail({commit,state},{key,value}){
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		let index = state.editIndex
		pageInfo.content[index].detail[key] = value
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	updateContent({commit,state},{key,value}){
		let pageInfo = JSON.parse(JSON.stringify(state.pageInfo))
		pageInfo.detail[key] = value
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	setPosterUrl({commit},url){
		commit(UPDATE_POSTER,url)
	},
	getPageInfo({commit,state},id){
		let localPageList =  localStorage.getItem('localPageList')
		let pageList = null
		if(localPageList){
			pageList = [...state.pageList,...JSON.parse(localPageList)]
		}else{
			pageList = state.pageList
		}
		let pageInfo = copy(pageList.filter(item=>item.id == id)[0])
		// console.log(pageInfo)
		commit(UPDATE_PAGE_INFO,{pageInfo})
	},
	updatePageList({commit,state},localPageList){
		let pageList = state.pageList.concat(localPageList)
		commit(UPDATE_PAGElIST,pageList)
	}
}

function copy(obj){
	return JSON.parse(JSON.stringify(obj))
} 