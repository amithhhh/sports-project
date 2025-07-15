import { Email, Person, Lock } from '@mui/icons-material';

export const inputFields = [
  {
    name: 'username',
    placeholder: 'Username',
    type: 'text',
    icon: <Person />
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
    icon: <Email />
  },
  {
    name: 'password1',
    placeholder: 'Password',
    type: 'password',
    icon: <Lock />
  },
  {
    name: 'password2',
    placeholder: 'Retype Password',
    type: 'password',
    icon: <Lock />
  }
];

export const loginFields = [
  {
    name: 'username',
    placeholder: 'Username',
    type: 'text',
    icon: <Person />
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    icon: <Lock />
  }
];


export const navbarItems = [
  {
    name: 'shop',
    path: '/shopping'
  },
  {
    name: 'settings',
    path: '/settings'
  },
  {
    name: 'orders',
    path: '/orders'
  }
]