import { Inter } from 'next/font/google';
import { AppHeader } from '@components/AppHeader';
import { UserContextProvider } from '@user/presentation/hooks/useUser';
import { getUserBySession } from '@user/user-service';
import { Providers } from 'modules/shared/presentation/providers/chakra-provider';
import 'styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserBySession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserContextProvider initialUser={user}>
            <AppHeader />
            {children}
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
