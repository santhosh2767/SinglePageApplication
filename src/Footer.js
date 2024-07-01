import React from 'react';
import { format } from 'date-fns';

const Footer = () => {
  const dateTime = format(new Date(), "MM-dd-yy p");
  return (
    <footer>
      <h1>{dateTime}</h1>
    </footer>
  );
};

export default Footer;
