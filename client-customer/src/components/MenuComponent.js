import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Button, Input, Space, Typography} from 'antd';
const items = {
  title: 'products',
}
class Menu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      nav: false,
    };
  }
  handleNav = () => { 
    let temp = this.state.nav === false ? true : false;
    this.setState({ nav: temp });
    // console.log();
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li onClick={() => { this.handleNav() }} key={item._id} className="text-center cursor-pointer p-[15px] space-x-2 uppercase transition-all hover:text-orange-500 relative after:w-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-orange-500 after:transition-all after:hover:w-full"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="shadow overflow-hidden">
        <div className="container-80">
        <div className="flex justify-between flex-wrap items-baseline md:items-center sm:inline-block w-full">
          <div className="flex flex-wrap  justify-between items-center py-5 ">
          <div className="logo w-full sm:w-[50%]">
            <Link to={'/home'}>
              <img src="https://phono-demo.myshopify.com/cdn/shop/files/logo.png?v=1620470788&width=250" alt="" />
            </Link>
          </div>
          {/* Hamburger bar */}
          <div className="w-full inline-block sm:hidden">
          {(!this.state.nav) ? <div className="w-[81%] top-5 absolute z-10 bg-transparent text-black mb-3">
            <div id='hamburber-bar' className="inline-block sm:hidden w-full">
              <div className="bar w-[60px] ml-auto ">
                <Button onClick={() => { this.handleNav() }} className='text-[30px] w-full h-full p-0'>☰</Button>
              </div>
            </div>
          </div> : <div className="w-[81%] absolute z-10 bg-white text-black mb-3">
            <div id='hamburber-bar' className="inline-block sm:hidden w-full">
              <div className="bar text-black ml-auto w-[60px]"> 
                <Button onClick={() => { this.handleNav() }} className='w-full h-full text-[30px] p-0'>X</Button>
              </div>
              <ul className='flex-row justify-center'>
                <li onClick={() => { this.handleNav() }} className='text-center cursor-pointer p-[15px] space-x-2 uppercase transition-all hover:text-orange-500 relative after:w-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-orange-500 after:transition-all after:hover:w-full'>
                <Link to={'/home'}>Home</Link>
                </li>
                {cates} 
              </ul>
            </div>
          </div>}
          </div>
          <div className='mt-5 md:mt-0 hidden sm:inline-block w-[50%] ml-auto'>
            <form action="" className='text-right'>
              <Space direction="vertical" size="middle">
                <Space.Compact style={{ width: '100%' }}>
                  <Input value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}/>
                  <Button onClick={(e) => this.btnSearchClick(e)}  htmlType='submit' className='bg-blue-500 hover:text-black'>Search</Button>
                </Space.Compact>
              </Space>
            </form>
          </div>
          </div>
          <div className="hidden sm:inline-block">
            <ul className=' sm:flex'>
              <li className='cursor-pointer p-[15px] space-x-2 uppercase transition-all hover:text-orange-500 relative after:w-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-orange-500 after:transition-all after:hover:w-full'>
              <Link to={'/home'}>Home</Link>
              </li>
            {cates} 
            </ul>
          </div>
          
        </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);