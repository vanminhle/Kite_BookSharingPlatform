import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms, FaUserFriends } from 'react-icons/fa';
import { BiHomeSmile, BiSupport, BiBarChartAlt2 } from 'react-icons/bi';
import { TbBooks } from 'react-icons/tb';
import { MdOutlineInventory2 } from 'react-icons/md';
import { FiBook } from 'react-icons/fi';
import { BiBookmarks } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';

export const linksAdmin = [
  { id: 1, text: 'Statistics', path: '/', icon: <IoBarChartSharp /> },
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
  { id: 1, text: 'Statistics', path: '/', icon: <IoBarChartSharp /> },
];

export const links = [
  { id: 1, text: 'Home', path: '/', icon: <BiHomeSmile /> },
  { id: 2, text: 'Browse', path: '/', icon: <TbBooks /> },
  { id: 3, text: 'Inventory', path: '/', icon: <MdOutlineInventory2 /> },
  { id: 4, text: 'Wishlist', path: '/', icon: <BiBookmarks /> },
  { id: 5, text: 'My Books', path: '/my-books', icon: <FiBook /> },
  { id: 6, text: 'Statistics', path: '/', icon: <BiBarChartAlt2 /> },
  { id: 7, text: 'Support', path: '/', icon: <BiSupport /> },
];
