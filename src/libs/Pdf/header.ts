import { imagePdf } from './image';

export const Header = () => {
  return [
    {
      image: imagePdf,
      fit: [100, 100],
      margin: [0, 0, 0, 20],
    },
  ];
};
