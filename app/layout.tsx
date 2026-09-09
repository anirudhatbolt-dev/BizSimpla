import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Biz Simpler — Get More Google Reviews, The Way Google Likes It',
  description: 'Biz Simpler helps businesses collect more Google reviews the right way — boosting your Google Business Profile without spammy tactics.',
  openGraph: {
    title: 'Biz Simpler — Get More Google Reviews, The Way Google Likes It',
    description: 'Biz Simpler helps businesses collect more Google reviews the right way — boosting your Google Business Profile without spammy tactics.',
    url: 'https://www.bizsimpler.com',
    siteName: 'Biz Simpler',
    type: 'website',
    images: [
      {
        url: 'https://www.bizsimpler.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
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