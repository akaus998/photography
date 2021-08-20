import React from 'react';
import {Router, Route} from 'react-router-dom';
import Home from './Home.js';
import Galleries from './Galleries.js';
import history from '../history.js';
import AboutUs from './AboutUs.js';
import AdminPage from './admin/AdminPage.js';

const App=()=>{

	return(
		<div>
		<Router forceRefresh={true} history={history}>
		<div>
		<Route path='/' exact component={Home} />
		<Route path='/Galleries' exact component={Galleries} />
		<Route path='/AboutUs' exact component={AboutUs} />
		<Route path='/AdminPage' exact component={AdminPage} />
		</div>
		</Router>
		</div>
		);
	}

	export default App;