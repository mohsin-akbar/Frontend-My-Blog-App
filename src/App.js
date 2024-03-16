
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import Signup from './pages/signup';
import Service from './Services/Service'
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import { UserDashboard } from './pages/user-routes/UserDashboard';
import { PrivateRouting } from './pages/PrivateRouting';
import Profile from './pages/user-routes/Profile-Info';
import { PostPage } from './pages/userPages/PostPage';
import { UserProfile } from './pages/userPages/user-porfile';
import { AllPosts } from './pages/userPages/AllPosts';
import { PostComment } from './pages/userPages/PostComment';
import { UpdatePost } from './pages/userPages/UpdatePost';
import { UpdateUser } from './pages/userPages/UpdateUser';
import { EmailPage } from './pages/userPages/EmailPage';
import { Image } from './pages/userPages/Image';


function App() {
 
  return (
   
  
      <BrowserRouter>
      <ToastContainer/>
       <Routes>
           
            <Route path='/about' element={<About/>} />
            <Route path='/image' element={<Image/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/service' element={<Service/>} />
            <Route exact path="/" element={<Home/>} />
            <Route path='/user-dashboard' element={<UserDashboard/>}/>
            {/* <Route exact path="/post" element={<PostPage/>} /> */}
            {/* //for private routing */}
            <Route path='/private' element={<PrivateRouting/>}>
            <Route path='user' element={<UserDashboard/>}/>
            <Route path='profile-info' element={<Profile/>}/>
            <Route exact path="post" element={<PostPage/>} />
            <Route exact path="posts" element={<AllPosts/>} />
            
            <Route exact path="email/:email" element={<EmailPage/>} />
            <Route exact path="updateUser/:username" element={<UpdateUser/>} />
            <Route exact path="comment/:id" element={< PostComment/>} />
            <Route exact path="user-profile/:username" element={<UserProfile/>} />
            <Route exact path="updatePost/:id" element={<UpdatePost/>} />
            </Route>

            
          </Routes>
          </BrowserRouter>
       
   
  );
}

export default App;
