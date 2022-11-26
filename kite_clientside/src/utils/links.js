import { MdOutlineRateReview } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { TbBooks } from 'react-icons/tb';
import { MdOutlineInventory2, MdPayment } from 'react-icons/md';
import { FiBook } from 'react-icons/fi';
import { BsBookmarkStar } from 'react-icons/bs';
import { BsBox } from 'react-icons/bs';
import { MdHelpOutline } from 'react-icons/md';

export const linksAdmin = [
  {
    id: 1,
    text: 'Statistics',
    path: '/',
    icon: <BiBarChartAlt2 />,
  },
  {
    id: 2,
    text: 'Accounts',
    path: '/account-management',
    icon: <FaUserFriends />,
  },
  {
    id: 3,
    text: 'Tags',
    path: '/tags-management',
    icon: <BsBookmarkStar />,
  },
  {
    id: 4,
    text: 'Books',
    path: '/books-management',
    icon: <BsBox />,
  },
];

export const linksManager = [
  { id: 1, text: 'Statistics', path: '/', icon: <BiBarChartAlt2 /> },
  { id: 2, text: 'Books', path: '/manager/manage-books', icon: <BsBox /> },
  {
    id: 3,
    text: 'Transactions',
    path: '/manager/transactions-management',
    icon: <MdPayment />,
  },
  {
    id: 4,
    text: 'Reviews',
    path: '/manager/reviews-management',
    icon: <MdOutlineRateReview />,
  },
  { id: 5, text: 'Support', path: '/manager/support', icon: <MdHelpOutline /> },
];

export const links = [
  { id: 1, text: 'Browse', path: '/browse', icon: <TbBooks /> },
  {
    id: 2,
    text: 'Inventory',
    path: '/my-inventory',
    icon: <MdOutlineInventory2 />,
  },
  { id: 3, text: 'My Books', path: '/my-books', icon: <FiBook /> },
  { id: 5, text: 'Support', path: '/support', icon: <MdHelpOutline /> },
];
