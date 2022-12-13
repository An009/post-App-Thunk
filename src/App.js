import './App.css';
import AddPostForm from './Components/Posts/AddPostForm';
import SpesificPost from './Components/Posts/SpesificPost';
import PostList from './Components/Posts/PostList';
import Home from './Components/Home';
import { Routes , Route} from 'react-router-dom';
import EditPost from './Components/Posts/EditPost';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/post' element={<PostList/>}/>
        <Route path='/addPost' element={<AddPostForm/>}/>
        <Route path='post/:postId' element={<SpesificPost />}/>
        <Route path='/edit/:postId' element={<EditPost />}/>
      </Routes>
    </div>
  );
}
export default App;
