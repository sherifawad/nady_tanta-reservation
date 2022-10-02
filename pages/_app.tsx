import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserProvider>
	);
}

export default MyApp;
