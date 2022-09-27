/* eslint-disable @next/next/no-img-element */

function Navbar() {
	return (
		<div className="bg-ocean w-full flex justify-between items-center bg-blue-800">
			<a href="http://localhost:3000/" className="py-2">
				<img src="/TantaLogo.png" className="mie-8" alt="logo" />
			</a>
			<a
				href="http://localhost:3000/"
				className="text-white font-bold hover:bg-yellow-500 hover:text-blue-800 p-0 m-0 h-16 flex justify-center items-center"
			>
				<span className="px-4">اتصل بنا</span>
			</a>
		</div>
	);
}

export default Navbar;
