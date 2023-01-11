import Header from '../../comment/Header/Header'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function NewArticle (){
    let history =useHistory()
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()
    const [body,setBody] = useState()
    const [tagList,setTag] = useState()
    const [stuta,setStuta] = useState(false)

    let obj={
        "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList,
       }  
    }
    
    const {data,isError,error} = useQuery(['publisharticle',obj],()=>{
        return  axios(
            {
                url:'/api/articles',
                method:'POST',
                data:obj,
                headers: {
                    Authorization:`Token ${ sessionStorage.getItem('token')}`,
                  }
            })
    },{ enabled:stuta}
    )
    if(data){  history.push('/profile')}
   
    return(
        <div>
        <Header></Header>
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Article Title"  onChange={(e)=>setTitle(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control" placeholder="What's this article about?" onChange={(e)=>setDescription(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control" rows="8"
                                        placeholder="Write your article (in markdown)"  onChange={(e)=>setBody(e.target.value)}></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter tags" onChange={(e) => {
                                        setTag(e.target.value.trim().split(/\s+/))
                                    }}/>
                                    <div className="tag-list"></div>
                                </fieldset>
                                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={()=>setStuta(true) }>
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}