import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Table from './Table'
import Landing from './Landing'
import NotFound from './NotFound'
import AboutUs from './AboutUs'

const Main = () => (
    <main>
        <Switch>
            <Route path="/home" component={Landing} />
            <Route path="/table" component={Table} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route component={NotFound} />
        </Switch>
    </main>
);

export default Main

