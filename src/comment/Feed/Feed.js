import React, { useState,useEffect } from 'react'
export default function Feed(props){
    return(
        <div>
            {
               props.list && props.list.map((item,index)=>{
                return <div className="article-preview" key={index}>
                            <div className="article-meta">
                                <a href="profile.html">
                                <img src={item.author.image} />
                                </a>
                                <div className="info">
                                    <span className="author">
                                        {item.author.username}
                                    </span>
                                    <span className="date">{item.createdAt}</span>
                                </div>
                                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart" /> {item.favoritesCount}
                                    </button>
                            </div>
                            <a href="" className="preview-link">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <span>Read more...</span>
                            </a>
                        </div>
               }) 
            }
              
        </div>
    )
}