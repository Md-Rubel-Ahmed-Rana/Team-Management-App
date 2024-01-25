
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'app/store'
import { Toaster } from 'react-hot-toast'
import "@/styles/globals.css";
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return (
    <div className='max-w-[1280px] w-full mx-auto'> 
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </Provider>
  </div>
  )
  
}

