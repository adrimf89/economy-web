import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import InfoPanel from './InfoPanel';
import MonthStatistics from '../../pages/MonthStatistics';
import AccountList from '../../pages/account/AccountList';
import CreateAccount from '../../pages/account/CreateAccount';
import TransactionList from '../../pages/transaction/TransactionList';
import CreateTransaction from '../../pages/transaction/CreateTransaction';
import EditTransaction from '../../pages/transaction/EditTransaction';
import DeleteTransaction from '../../pages/transaction/DeleteTransaction';
import CategoryList from '../../pages/category/CategoryList';
import CreateCategory from '../../pages/category/CreateCategory';
import EditCategory from '../../pages/category/EditCategory';
import Login from '../../pages/Login';
import history from '../../history';

const App = () => {
    return (
        <Container>
            <Router history={history}>
                <div>
                    <Header />
                    <InfoPanel />
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <PrivateRoute path="/" exact component={AccountList} />
                        <PrivateRoute path="/accounts/new" exact component={CreateAccount} />
                        <PrivateRoute path="/accounts/:accountId/transactions" exact component={TransactionList} />
                        <PrivateRoute path="/accounts/:accountId/transactions/new" exact component={CreateTransaction} />
                        <PrivateRoute path="/accounts/:accountId/transactions/edit/:transactionId" exact component={EditTransaction} />
                        <PrivateRoute path="/accounts/:accountId/transactions/delete/:transactionId" exact component={DeleteTransaction} />
                        <PrivateRoute path="/accounts/:accountId/statistics" exact component={MonthStatistics} />
                        <PrivateRoute path="/categories" exact component={CategoryList} />
                        <PrivateRoute path="/categories/new" exact component={CreateCategory} />
                        <PrivateRoute path="/categories/edit/:categoryId" exact component={EditCategory} />
                    </Switch>
                </div>
            </Router>
        </Container>
    );
  };
  
  export default App;