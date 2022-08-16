import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms, FaUserFriends } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

export const linksAdmin = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: 'Accounts',
    path: 'account-management',
    icon: <FaUserFriends />,
  },
  // { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  // { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export const linksManager = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
];

export const links = [
  { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
];
