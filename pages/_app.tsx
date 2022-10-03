import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import { getUser, supabaseClient, User } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { CustomUserProvider } from "../components/common/CustomUserProvider";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps, user }: AppProps & { user?: User }) {
	const { pathname } = useRouter();
	return (
		<CustomUserProvider supabaseClient={supabaseClient} pathname={pathname} user={user}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CustomUserProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const { user } = await getUser(ctx);
		return {
			props: { user },
		};
	} catch (error) {
		return {
			props: {},
		};
	}
};

export default MyApp;
