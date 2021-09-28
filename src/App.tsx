import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Tchat from './components/Tchat';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const auth = localStorage.getItem('user_id');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!Boolean(auth)) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Tchat} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
