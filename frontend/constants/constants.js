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
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    icon: <Lock />
  },
  {
    name: 'password',
    placeholder: 'Retype Password',
    type: 'password',
    icon: <Lock />
  }
];

export const registerFields = [
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
