import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />  
      {/* Putting our layout into this direcory */}
      <body className="">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
