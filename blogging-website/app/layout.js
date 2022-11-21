import Navbar from "../components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />  
      {/* Putting our layout into this direcory */}
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
