import { IconType } from 'react-icons';
import { GoHome } from 'react-icons/go';
import { FaSearch, FaDownload } from 'react-icons/fa';
import { MdOutlineConnectedTv } from 'react-icons/md';

const homePageData = {
  withLogo: true,
  title: 'Minha conta',
  icons: [MdOutlineConnectedTv, FaSearch, FaDownload],
};

const newsPageData = {
  withLogo: false,
  title: 'Novidades',
  icons: [GoHome, GoHome],
};

const myNetflixPageData = {
  withLogo: false,
  title: 'Minha Netflix',
  icons: [GoHome, GoHome],
};
const gamePageData = {
  withLogo: false,
  title: 'Games',
  icons: [GoHome, GoHome],
};

const dataPages = {
  homePageData,
  newsPageData,
  myNetflixPageData,
  gamePageData,
};

export interface DataPageInterface {
  withLogo: boolean;
  title: string;
  icons: IconType[];
}

export default dataPages;
