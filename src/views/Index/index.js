import { NavLink } from 'react-router-dom'
import Bodys from '../../comment/Bodys/Bodys';
import Footer from '../../comment/Footer/Footer';
import Header from '../../comment/Header/Header'
export default function indexs() {
    return (
        <div>
            {/* 头 */}
             <Header/>
            {/* 中 */}
             <Bodys/>
            {/* 尾 */}
             <Footer/>
        </div>
      
    );
  }