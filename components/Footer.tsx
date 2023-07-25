import Image from 'next/image';

import { footerLinks } from '@/constants';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-black-100 flex flex-col mt-5 border-t border-gray-100">
      <div className="max-md:flex-col sm:px-16 flex flex-wrap justify-between gap-5 px-6 py-10">
        <div className="flex flex-col justify-start gap-6">
          <Image
            src="/public/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          ></Image>
          <p className="text-base text-gray-700">
            Carhub 2023 <br />
            All rights reserved &copy;
          </p>
        </div>
        {/* Footer links */}
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  href={item.url}
                  key={item.title}
                  className="text-gray-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="sm:px-16 flex flex-wrap items-center justify-between px-6 py-10 mt-10 border-t border-gray-100">
        <p>@2023 Carhub. All Rights Reserved</p>
        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
