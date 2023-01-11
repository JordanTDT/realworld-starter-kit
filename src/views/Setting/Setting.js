import Header from '../../comment/Header/Header'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { useQuery,useQueryClient,useMutation} from '@tanstack/react-query'

export default function Setting(){
    let history =useHistory()
    const [ponseData,setResponseData] = useState()
    //获取回显数据
    const queryClient = useQueryClient();
    const { data, refetch } = useQuery(['setting'], 
     ()=>  axios({
      url: '/api/user',
      method: "GET",
      headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
      }
      }))
       let obj = {
        "user": {
            "email": data?.data?.user?.email ,
            "password": data?.data?.user?.password ,
            "token": sessionStorage.getItem('token'),
            "bio": data?.data?.user?.bio,
            "image": data?.data?.user?.image,
            'username':data?.data?.user?.username,
        }
      }
       
       const  mutation  = useMutation((ponseData) => 
       {
        return  axios({
          url: '/api/user',
          method: "PUT",
          data: ponseData,
          headers: {
            Authorization:`Token ${ sessionStorage.getItem('token')}`,
          }
          })
          }, {
            onSuccess: () => {
              console.log(ponseData)
              history.push('/index')
              refetch()
              queryClient.invalidateQueries('setting')
            },
            onError: (error) => {
              console.log(error)
            },
         })

    useEffect(()=>{
        setResponseData(obj)
    },[])

    return(
        <div>
          <Header/>
            <div className="settings-page">
               {
                  data && <div className="container page">
                 <div className="row">
                   <div className="col-md-6 offset-md-3 col-xs-12">
                     <h1 className="text-xs-center">Your Settings</h1>
                     <form>
                       <fieldset>
                         <fieldset className="form-group">
                           <input className="form-control"  value={ ponseData?.user?.image ? ponseData?.user?.image : ''} type="text" placeholder="URL of profile picture" 
                              onChange={(e)=>
                                {
                                  obj.user.image = e.target.value 
                                  setResponseData(obj)
                                  console.log(obj)
                                }
                                } />
                         </fieldset>
                         <fieldset className="form-group">
                           <input  className="form-control form-control-lg"  value={ponseData?.user?.username ? ponseData?.user?.username : ''} type="text" placeholder="Your Name"  onChange={(e)=>
                                {
                                  obj.user.username = e.target.value 
                                  setResponseData(obj)
                                  console.log(obj)
                                }
                                } />
                         </fieldset>
                         <fieldset className="form-group">
                           <textarea className="form-control form-control-lg" value={ponseData?.user?.bio ? ponseData?.user?.bio  : ''} rows={8} placeholder="Short bio about you"    onChange={(e)=>
                                {
                                  obj.user.bio = e.target.value 
                                  setResponseData(obj)
                                  console.log(obj)
                                }
                                } />
                         </fieldset>
                         <fieldset className="form-group">
                           <input className="form-control form-control-lg" type="text" value={ponseData?.user?.email  ? ponseData?.user?.email : ''}  placeholder="Email"  onChange={(e)=>
                                {
                                  obj.user.email = e.target.value 
                                  setResponseData(obj)
                                  console.log(obj)
                                }
                                } />
                         </fieldset>
                         <fieldset className="form-group">
                           <input className="form-control form-control-lg" type="password" value={ponseData?.user?.password ? ponseData?.user?.password  : ''} placeholder="Password"   onChange={(e)=>
                                {
                                  obj.user.password = e.target.value 
                                  setResponseData(obj)
                                  console.log(obj)
                                }
                                } />
                         </fieldset>
                         <button className="btn btn-lg btn-primary pull-xs-right" onClick={() => mutation.mutate(ponseData)}>
                           Update Settings
                         </button>
                       </fieldset>
                     </form>
                     <hr />
                   </div>
                 </div>
               </div> 
               }
           </div>
         </div>
    )
}