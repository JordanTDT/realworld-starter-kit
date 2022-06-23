import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Center from '../../components/Center/Center'
import Banner from '../../components/Banner/Banner'

export default class Index extends Component {
  render() {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <Center></Center>
            <Footer></Footer>
        </div>
    )
  }
}
