const Footer = () => {
	return (
		<footer className="flex flex-grow justify-center items-center  bg-[#FBFBFD]">
			<a
				href="mailto:shereifawad@gmail.com?subject=Nady-Tanta-reservation Developer"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by Awad &copy; {new Date().getFullYear().toString()}
				{/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span> */}
			</a>
		</footer>
	);
};

export default Footer;
