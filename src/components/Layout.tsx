import Head from 'next/head';
import NavBar from '@/components/Navbar';

type MetaData = {
  title: string;
  description: string;
};

const Layout = ({data, children}: { data: MetaData, children: any }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        <title>{data.title}</title>
      </Head>
      <main>
        <NavBar />
        <div className="container mx-auto">
          {children}
        </div>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <div>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by The Realms Beyond</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Layout;