import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Sales from '../pages/Sales';
import Sale from '../pages/Sale';
import NewSale from '../pages/NewSale';
import Products from '../pages/Products';
import Product from '../pages/Product';
import NewProduct from '../pages/NewProduct';
import Costumers from '../pages/Costumers';
import Costumer from '../pages/Costumer';
import NewCostumer from '../pages/NewCostumer';
import Users from '../pages/Users';
import User from '../pages/User';
import NewUser from '../pages/NewUser';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/usuarios" component={Users} isPrivate />
      <Route path="/vendas" component={Sales} isPrivate />
      <Route path="/produtos" component={Products} isPrivate />
      <Route path="/clientes" component={Costumers} isPrivate />

      <Route path="/usuario/:email" component={User} isPrivate />
      <Route path="/venda/:id" component={Sale} isPrivate />
      <Route path="/produto/:name" component={Product} isPrivate />
      <Route path="/cliente/:email" component={Costumer} isPrivate />

      <Route path="/cadastro/usuario" component={NewUser} isPrivate />
      <Route path="/cadastro/venda" component={NewSale} isPrivate />
      <Route path="/cadastro/produto" component={NewProduct} isPrivate />
      <Route path="/cadastro/cliente" component={NewCostumer} isPrivate />
    </Switch>
  );
}
