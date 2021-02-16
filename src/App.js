import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getData } from "./components/Api/AsyncHttpRequest";
import { Menu, Card, User } from "./components"

export default function App() {
  const [search, setSearch] = useState('');
  const [selectOptionCard, setSelectOptionCard] = useState(false);
  const urlApi = `${process.env.REACT_APP_API_ALL_POSTS}`;
  const [userAuth, setUserAuth] = useState({});
  const [data, setData] = useState([]);

  const getDataEvent = () => {
    if (search !== '') {
      let url = `${urlApi}/photos/${search}`;
      getData(url, setData);
    } else {
      let url = `${urlApi}/albums/1/photos`;
      getData(url, setData);
    }

  };

  useEffect(() => {
    setUserAuth(JSON.parse(localStorage.getItem("user")));
    getDataEvent();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <Menu userAuth={userAuth} getDataEvent={getDataEvent} setSearch={setSearch} setSelectOptionCard={setSelectOptionCard} search={search} />
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <div className="h-auto bg-gray-700 pb-44">
              <div className="flex flex-wrap">
                <Card data={data} selectOptionCard={selectOptionCard} />;
              </div>
            </div>
          </Route>
          <Route path="/user">
            <div className="p-20">
              <User />
            </div>
          </Route>
          <Route path="/posts">
            <div className="flex flex-wrap">
              eee
              </div>
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

