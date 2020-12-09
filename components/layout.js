import Head from 'next/head'
import Nav from '../components/includes/nav';
import Footer from '../components/Footer/footer'



function Layout({ user, children }) {
    console.log("user from layout", user)
    return (
      <>
        
        <Head>
        <title>APE</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" rel="stylesheet" />
      </Head>
      
  
        <Nav user={user} />  
        <main>
          <div className="container">{children}</div>
        </main>
        <Footer />
      </>
    )
  }
  
  export default Layout