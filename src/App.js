import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import PostsPage from './Components/PostsPage';
import ReadPage from './Components/ReadPage';
import UpdatePage from './Components/UpdatePage';
import { UserContext } from './Components/UserContext';
import WritePage from './Components/WritePage';
import HeaderPage from './HeaderPage';

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            <div className="App">
                <HeaderPage />

                <Switch>
                    <Route path='/' component={HomePage} exact={true} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/posts' component={PostsPage} exact={true} />
                    <Route path='/posts/write' component={WritePage} exact={true} />
                    <Route path='/posts/:id' component={ReadPage} exact={true} />
                    <Route path='/posts/update/:id' component={UpdatePage} exact={true} />
                </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default App;
