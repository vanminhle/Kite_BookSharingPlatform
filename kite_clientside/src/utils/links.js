import { MdFeedback, MdOutlineRateReview } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { BiHomeSmile, BiSupport, BiBarChartAlt2 } from 'react-icons/bi';
import { TbBooks } from 'react-icons/tb';
import {
  MdOutlineInventory2,
  MdPayment,
  MdOutlineFeedback,
} from 'react-icons/md';
import { FiBook } from 'react-icons/fi';
import { BsBookmarkStar } from 'react-icons/bs';
import { BiBookmarks } from 'react-icons/bi';
import { BsBox } from 'react-icons/bs';
import { RiProfileLine } from 'react-icons/ri';

export const linksAdmin = [
  { id: 1, text: 'Statistics', path: '/', icon: <BiBarChartAlt2 /> },
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
  { id: 5, text: 'Authors', path: '/', icon: <RiProfileLine /> },
  { id: 6, text: 'Tickets', path: '/', icon: <MdOutlineFeedback /> },
];

export const linksManager = [
  { id: 1, text: 'Statistics', path: '/', icon: <BiBarChartAlt2 /> },
  { id: 2, text: 'Books', path: '/manager/manage-books', icon: <BsBox /> },
  { id: 3, text: 'Authors', path: '/', icon: <RiProfileLine /> },
  {
    id: 4,
    text: 'Translations',
    path: '/manager/transactions-management',
    icon: <MdPayment />,
  },
  { id: 5, text: 'Reviews', path: '/', icon: <MdOutlineRateReview /> },
  { id: 6, text: 'Tickets', path: '/', icon: <MdOutlineFeedback /> },
];

export const links = [
  { id: 1, text: 'Home', path: '/', icon: <BiHomeSmile /> },
  { id: 2, text: 'Browse', path: '/', icon: <TbBooks /> },
  {
    id: 3,
    text: 'Inventory',
    path: '/my-inventory',
    icon: <MdOutlineInventory2 />,
  },
  // { id: 4, text: 'Wishlist', path: '/', icon: <BiBookmarks /> },
  { id: 4, text: 'My Books', path: '/my-books', icon: <FiBook /> },
  { id: 5, text: 'Statistics', path: '/', icon: <BiBarChartAlt2 /> },
  { id: 6, text: 'Support', path: '/', icon: <BiSupport /> },
];
