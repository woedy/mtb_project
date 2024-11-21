const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <>
      <header className="sticky top-0 z-999 flex w-full bg-gradient-to-b from-green from-0% via-middarkgreen via-40% to-darkgreen to-70% drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 w-full">
          {/* Hamburger Button */}
          <div className="flex items-center">

            <div className="text-center">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="rounded-sm p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5.5 w-9.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-1 w-0 bg-white delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-1 w-0 bg-white delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'}`}
                    ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-1 w-0 bg-white delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'}`}
                    ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-white delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'}`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-white duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'}`}
                  ></span>
                </span>
              </span>
            </button>

            <p className="text-[12px] text-white">Menu</p>

            </div>
  
          </div>

          {/* Logo */}
          <div className="flex flex-grow items-center justify-center">
            <a
              className="dib pa2 ml3 v-mid grayscale-icon"
              href="https://turbotax.intuit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                srcSet="https://www.mtb.com/content/dam/mtb-web/logos/white%20logo.png"
                src="https://www.mtb.com/content/dam/mtb-web/logos/white%20logo.png"
                width="125"
                height="35"
                role="img"
                title="TurboTax"
                aria-label="TurboTax"
                alt="TurboTax"
              />
            </a>
          </div>

          {/* Empty space to balance layout */}
          <div className="flex gap-3"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
