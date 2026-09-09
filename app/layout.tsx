import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Biz Simpler — Get More Google Reviews On Autopilot',
  description: 'A calmer way for businesses to grow their reputation — collect more Google reviews without chasing customers.',
  openGraph: {
    title: 'Biz Simpler — Get More Google Reviews On Autopilot',
    description: 'A calmer way for businesses to grow their reputation — collect more Google reviews without chasing customers.',
    url: 'https://www.bizsimpler.com',
    siteName: 'Biz Simpler',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJJKVZ654K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJJKVZ654K');
          `}
        </Script>
      </body>
    </html>
  );
}