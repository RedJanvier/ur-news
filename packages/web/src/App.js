import React, { useContext, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/NavBar/NavBar";
import Spinner from "./components/Spinner/Spinner";
import { GlobalContext } from "./context/GlobalState";
import ChatPane from "./components/shared/chat/ChatPane";
import ChatIcon from "./components/shared/chat/ChatIcon";
// import Authorization from "./components/shared/Authorization";
// import HomePage from "./pages/HomePage";
const HomePage = lazy(() => import("./pages/HomePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EditNews = lazy(() => import("./pages/EditNewsPage"));
const CreateNewsPage = lazy(() => import("./pages/CreateNewsPage"));
const SingleNews = lazy(() => import("./pages/SingleNewsPage"));

const App = () => {
  const { role, token } = useContext(GlobalContext);
  const [state, setState] = useState({ showLinks: false, showChatPane: false });

  const changeLinksView = () =>
    setState({ ...state, showLinks: !state.showLinks });

  const toggleShowChatPane = () =>
    setState({ ...state, showChatPane: !state.showChatPane });

  return (
    <>
      <Router>
        {token && (
          <>
            <Navbar
              changeLinksView={changeLinksView}
              showLinks={state.showLinks}
            />
            <ChatIcon clickHandler={toggleShowChatPane} />
            {state.showChatPane && <ChatPane />}
          </>
        )}
        <main
          className="page"
          onClick={() =>
            state.showLinks && setState({ ...state, showLinks: false })
          }
        >
          <Suspense fallback={<Spinner />}>
            <Switch>
              {role !== "admin" && <Redirect from="/admin" to="/" exact />}
              {role === "student" && <Redirect from="/create" to="/" exact />}
              {role === "student" && <Redirect from="/created" to="/" exact />}
              {role === "student" && <Redirect from="/profile" to="/" exact />}
              {!token && <Redirect from="/" to="/auth" exact />}
              {!token && <Redirect from="/home" to="/" exact />}
              {!token && <Redirect from="/create" to="/" exact />}
              {!token && <Redirect from="/created" to="/" exact />}
              {!token && <Redirect from="/profile" to="/" exact />}
              {!token && <Redirect from="/post/:id" to="/" exact />}
              {!token && <Redirect from="/post/edit/:id" to="/" exact />}
              {token && <Redirect from="/" to="/home" exact />}
              {token && <Redirect from="/auth" to="/home" exact />}
              <Route exact path="/auth" component={AuthPage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/created" component={HomePage} />
              <Route exact path="/profile" component={ProfilePage} />
              <PrivateRoute exact path="/create">
                <CreateNewsPage role={role} token={token} />
              </PrivateRoute>
              <PrivateRoute exact path="/admin" component={AdminPage} />
              <PrivateRoute exact path="/post/:id" component={SingleNews} />
              <PrivateRoute
                exact
                path="/post/edit/:newsId"
                component={EditNews}
              />
              <Route exact path="/404">
                <h1>Page not found Please!!!</h1>
                <Link to="/">Go back</Link>
              </Route>
              <Redirect from="/" to="/home" />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </>
  );
};

export default App;
