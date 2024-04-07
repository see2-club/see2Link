import React from 'react';
import ETHicon from './node_modules/cryptocurrency-icons/svg/icon/eth.svg';
import BTCicon from './node_modules/cryptocurrency-icons/svg/black/btc.svg';
// import manifest from './node_modules/cryptocurrency-icons/manifest.json';
import manifest from './manifest.json';

interface CryptoIconsProps {
  name: string;
  mode?: 'icon' | 'color' | 'black';
}

const CryptoIcons: React.FC<CryptoIconsProps> = ({ name, mode = 'icon' }) => {
  const icon = manifest.find((icon: any) => icon.symbol.toLowerCase() === name.toLowerCase());

  if (!icon) {
    return null;
  }
  const Icon = require(`node_modules/cryptocurrency-icons/svg/black/btc.svg`);
  console.log(Icon);
  // const Icon = require(`node_modules/cryptocurrency-icons/svg/${mode}/${icon.symbol.toLowerCase()}.svg`);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={Icon} alt={`${icon.name} Icon`} />;
};

export default CryptoIcons;

// interface CryptoIconsProps {
//   name: string;
// }

// const CryptoIcons: React.FC<CryptoIconsProps> = ({ name }) => {
//   switch (name) {
//     case 'eth':
//       return <img src={ETHicon} alt="Ethereum Icon" />;
//     case 'btc':
//       return <img src={BTCicon} alt="Bitcoin Icon" />;
//     default:
//       return null;
//   }
// };

// export default CryptoIcons;