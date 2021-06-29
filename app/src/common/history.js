import {createBrowserHistory} from "history";

// A singleton history object for easy API navigation
const history = createBrowserHistory();
//const history = createBrowserHistory({ basename: '/ssc-mix' });
export default history;
