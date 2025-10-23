export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0b0b0d', color: '#e9e9ef' }}>
        {children}
      </body>
    </html>
  );
}
