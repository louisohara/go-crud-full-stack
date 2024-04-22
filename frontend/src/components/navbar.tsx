import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NavLinks from "./nav-links";
import { User } from "@/data/definitions";
import Image from "next/image";

interface NavbarProps {
  getUsers: () => void;
  users: User[] | null;
}

const Navbar: React.FC<NavbarProps> = ({ getUsers, users }: NavbarProps) => {
  return (
    <div className="block h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="relative mb-2 flex h-20 items-end justify-start rounded-md bg-[#f19305]  md:h-40"
        href="/"
      >
        <div className=" w-full h-full text-white flex items-center justify-center">
          <Image
            src="/element3.png"
            alt="Element3 logo"
            width={80}
            height={80}
            className="block"
          />
        </div>
      </Link>
      <div className="h-full flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:flex-wrap">
        <NavLinks getUsers={getUsers} users={users} />
        <div className="hidden w-full h-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
};

export default Navbar;
