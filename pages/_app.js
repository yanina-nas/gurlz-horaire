import '../styles/globals.css'
import 'antd/dist/antd.css'
import '../tools/utils'
import { Layout, Menu } from 'antd';
import React from 'react';
import Head from 'next/head'
import { ConfigProvider } from 'antd';
import frFR from 'antd/lib/locale/fr_FR';

const { Header, Content, Footer } = Layout;
const menuItems = [
  {
    key: 'table',
    label: 'Horaire',
  },
  {
    key: 'calendar',
    label: 'Calendrier',
  },
  {
    key: 'faq',
    label: 'FAQ',
  },
]




function MyApp({ Component, pageProps }) {
  const [viewMode, setViewMode] = React.useState('table')
  const onMenuClick = (event) => {
    const { key } = event
    setViewMode(key)
  }
  return <>
  <ConfigProvider locale={frFR}>
  <Head>
        <title>Interface3 Horaire</title>
        <meta name="description" content="Interface3 schedule aka GURLZ horaire" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
  <Layout>
    <Header className="header">
      <Menu id="NavItem" theme="dark" mode="horizontal" defaultSelectedKeys={['table']} onClick={onMenuClick} items={menuItems} >
      </Menu>
    </Header>
    <Content
      style={{
        // padding: '0 50px',
      }}
    >
      <Layout
        className="site-layout-background"
        style={{
          padding: '0',
        }}
      >
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          <Component {...pageProps} viewMode={viewMode} />
        </Content>
      </Layout>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
        borderTop: '1px solid #eaeaea'
      }}
    >
      <code>
        {`< `}Made with love {` />`}
      </code>
    </Footer>
  </Layout>
  </ConfigProvider>
  </>
}

export default MyApp
