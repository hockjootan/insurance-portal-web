import { footerGroupLinks } from "src/config";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="localhost:3000" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Z
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerGroupLinks.map((group) => (
              <div key={group.title}>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  {group.title}
                </h2>
                <ul className="text-gray-500 font-medium">
                  {group.links.map((link) => (
                    <li key={link.title} className="mb-4">
                      <a href={link.href} className="hover:underline">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a href="localhost:3000" className="hover:underline">
              Z™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
