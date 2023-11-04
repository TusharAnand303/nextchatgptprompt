import '@styles/globals.css';

export const metadata = {
    title:"ChatGpt Prompt Nextapp",
    description:"Discover the power of chat gpt with the next power"
}


const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout
