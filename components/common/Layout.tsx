import { ReactNode } from "react";
import { LayoutProps } from "../../types";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: LayoutProps) => {
	return (
		// <div className="overflow-x-hidden min-h-screen grid grid-rows-[auto_1fr_auto]">
		<>
			<Header />
			<main className=" bg-[#FBFBFD] min-h-screen grid grid-cols-1 grid-rows-1 place-items-center place-content-center">
				{children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
