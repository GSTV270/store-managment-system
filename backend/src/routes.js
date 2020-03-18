const express = require('express');
const {
  isThisMonth,
  getDaysInMonth,
  getDate,
  parseISO,
  isSameDay,
  format,
} = require('date-fns');

const routes = new express.Router();

const branches = [
  {
    users: [
      { name: 'teste', email: 'teste@gmail.com', password: '123456' },
      { name: 'pedro', email: 'pedro@gmail.com', password: '654321' },
    ],
    products: [
      { name: 'Livro A', price: 20 },
      { name: 'Livro B', price: 30 },
    ],
    costumers: [
      {
        name: 'João',
        email: 'joao@gmail.com',
        age: 20,
        address: 'Rua teste, 123',
      },
      {
        name: 'Carlos',
        email: 'carlos@gmail.com',
        age: 30,
        address: 'Rua teste, 123',
      },
    ],
    sales: [
      {
        id: 1,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-01',
      },
      {
        id: 2,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-03',
      },
      {
        id: 3,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-03',
      },
      {
        id: 4,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-04',
      },
      {
        id: 5,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-06',
      },
      {
        id: 6,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-17',
      },
      {
        id: 7,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-18',
      },
      {
        id: 8,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-17',
      },
      {
        id: 9,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-18',
      },
      {
        id: 10,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-17',
      },
      {
        id: 11,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-18',
      },
      {
        id: 12,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-17',
      },
      {
        id: 13,
        costumer: 'joao@gmail.com',
        products: ['Livro A', 'Livro B'],
        price: 55,
        date: '2020-03-18',
      },
      {
        id: 14,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-17',
      },
      {
        id: 15,
        costumer: 'carlos@gmail.com',
        products: ['Livro A'],
        price: 20,
        date: '2020-03-25',
      },
    ],
  },
];

routes.get('/dashboard/:branch', (req, res) => {
  const { branch } = req.params;

  const numberOfDays = getDaysInMonth(new Date());
  const salesByDay = [];
  const profitByDay = [];
  const salesOfTheDay = [];

  for (let i = 0; i < numberOfDays; i += 1) {
    salesByDay.push({
      name: i + 1,
      sales: 0,
    });

    profitByDay.push({
      name: i + 1,
      profit: 0,
    });
  }

  branches[branch].sales.map(sale => {
    if (isThisMonth(parseISO(sale.date))) {
      const day = getDate(parseISO(sale.date));

      salesByDay.map(s => {
        if (s.name === day) {
          s.sales += 1;
        }
      });
      profitByDay.map(p => {
        if (p.name === day) {
          p.profit += sale.price;
        }
      });

      if (isSameDay(new Date(), parseISO(sale.date))) {
        salesOfTheDay.push(sale);
      }
    }
  });

  return res.status(200).json({ salesByDay, profitByDay, salesOfTheDay });
});

routes.get('/branches', (req, res) => {
  return res.status(200).json(branches.length);
});

routes.post('/sessions', (req, res) => {
  const { email, password, branch } = req.body;

  const user = branches[branch].users.find(user => user.email === email);

  if (user) {
    if (user.password === password)
      return res.status(200).json({ signed: true, name: user.name });
    else return res.status(400).json({ signed: false });
  } else return res.status(400).json({ signed: false });
});

routes.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find(user => user.email === email);

  if (userExists) res.status(400).json({ error: 'User already exists' });

  users.push({ name, email, password });

  return res.status(200).json({ error: false });
});

routes.get('/products/:branch', (req, res) => {
  const { branch } = req.params;

  const { products } = branches[branch];

  return res.status(200).json(products);
});

routes.get('/product/:branch/:name', (req, res) => {
  const { name, branch } = req.params;

  const product = branches[branch].products.find(
    product => product.name === name
  );

  if (product) return res.status(200).json(product);
  else return res.status(400).json({ error: true });
});

routes.delete('/products/:branch/:name', (req, res) => {
  const { name, branch } = req.params;

  branches[branch].products = branches[branch].products.filter(
    product => product.name !== name
  );

  return res.status(200).json({ success: true });
});

routes.put('/product/:branch/:oldName', (req, res) => {
  const { oldName, branch } = req.params;
  const { name, price } = req.body;

  branches[branch].products.map(product => {
    if (product.name === oldName) {
      product.name = name;
      product.price = price;
    }
  });

  return res.send();
});

routes.post('/product/:branch', (req, res) => {
  const { branch } = req.params;
  const { name, price } = req.body;

  branches[branch].products.push({ name, price });

  return res.status(200).json({ success: true });
});

routes.get('/sales/:branch', (req, res) => {
  const { branch } = req.params;

  const { sales } = branches[branch];

  return res.status(200).json(sales);
});

routes.get('/sale/:branch/:id', (req, res) => {
  const { id, branch } = req.params;

  const sale = branches[branch].sales.find(sale => sale.id === Number(id));

  const splittedDate = sale.date.split('-');
  const formattedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;

  return res.status(200).json({
    id: sale.id,
    costumer: sale.costumer,
    products: sale.products,
    price: sale.price,
    date: formattedDate,
  });
});

routes.post('/sale/:branch', (req, res) => {
  const { branch } = req.params;
  const { costumer, products, price, date } = req.body;

  const splittedDate = date.split('/');

  const formattedDate = format(
    new Date(splittedDate[2], splittedDate[1], splittedDate[0]),
    'yyyy-MM-dd'
  );

  const lastIndex = branches[branch].sales.length - 1;
  const newId = Number(branches[branch].sales[lastIndex].id + 1);

  branches[branch].sales.push({
    id: newId,
    costumer,
    products,
    price,
    date: formattedDate,
  });
  console.log(branches[branch].sales);

  return res.status(200).json({ success: true });
});

routes.get('/costumers/:branch', (req, res) => {
  const { branch } = req.params;

  const { costumers } = branches[branch];

  return res.status(200).json(costumers);
});

routes.get('/costumer/:branch/:email', (req, res) => {
  const { email, branch } = req.params;

  const costumer = branches[branch].costumers.find(
    costumer => costumer.email === email
  );

  return res.status(200).json(costumer);
});

routes.delete('/costumer/:branch/:email', (req, res) => {
  const { email, branch } = req.params;

  branches[branch].costumers = branches[branch].costumers.filter(
    costumer => costumer.email !== email
  );

  return res.status(200).json({ success: true });
});

routes.put('/costumer/:branch/:email', (req, res) => {
  const { email, branch } = req.params;
  const { name, age, address } = req.body;

  branches[branch].costumers.map(costumer => {
    if (costumer.name === email) {
      costumer.name = name;
      costumer.age = age;
      costumer.address = address;
    }
  });

  return res.send();
});

routes.post('/costumer/:branch', (req, res) => {
  const { branch } = req.params;
  const { name, email, age, address } = req.body;

  branches[branch].costumers.push({ name, email, age, address });

  return res.status(200).json({ success: true });
});

routes.get('/users/:branch', (req, res) => {
  const { branch } = req.params;

  const { users } = branches[branch];

  return res.status(200).json(users);
});

routes.get('/user/:branch/:email', (req, res) => {
  const { email, branch } = req.params;

  const user = branches[branch].users.find(user => user.email === email);

  user.password = undefined;

  return res.status(200).json(user);
});

routes.delete('/user/:branch/:email', (req, res) => {
  const { email, branch } = req.params;

  branches[branch].users = branches[branch].users.filter(
    costumer => costumer.email !== email
  );

  return res.status(200).json({ success: true });
});

routes.put('/user/:branch/:oldEmail', (req, res) => {
  const { oldEmail, branch } = req.params;
  const { name, email, password } = req.body;

  branches[branch].users.map(user => {
    if (user.email === oldEmail) {
      user.email = email;
      user.name = name;
      user.password = password;
    }
  });

  return res.send();
});

routes.post('/user/:branch', (req, res) => {
  const { branch } = req.params;
  const { name, email, password } = req.body;

  branches[branch].users.push({ name, email, password });

  return res.status(200).json({ success: true });
});

module.exports = routes;
