import { User } from '../models/user.model'; // Ensure the file exists at this path or update the path

export const MOCK_USERS: User[] = <User[]>[
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'User',
    email: 'user@test.com',
    password: 'user123',
    role: 'user',
  },
  {
    id: '3',
    name: 'Guest',
    email: '',
    password: '',
    role: 'guest',
  },
  {
    id: '4',
    name: 'Suad Krvavac',
    email: 'suad.krvavac@gmail.com',
    password: 'suad123',
    role: 'user',
  },
  {
    id: '5',
    name: 'Sanjo Krvavac',
    email: 'sanjo.krvavac@gmail.com',
    password: 'sanjo123',
    role: 'user',
  },
];
