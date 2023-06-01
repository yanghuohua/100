import React, { useEffect } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme,Input ,Button} from 'antd';
import { useState } from 'react'
import _ from 'lodash'

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [

  getItem('菜单一', 'sub1', <MailOutlined />, [
    getItem('子菜单1-1', '1'),
    getItem('子菜单1-2', '2'),
    getItem('子菜单1-3', '3'),
    getItem('子菜单1-4', '4'),
  ]),

  getItem('菜单二', 'sub2', <AppstoreOutlined />, [
    getItem('子菜单2-1', '5'),
    getItem('子菜单2-2', '6'),

    // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [arr, setArr] = useState(items)

  const [subm,setSubm] = useState('')
  const [keyPath,setkeyPath] = useState<string[]>([])

  const onClick: MenuProps['onClick'] = (e) => {
    setSubm( e.domEvent.target['innerText'])
    setkeyPath(e.keyPath)
  };

  const save = () => { 
    const cloneObj = _.cloneDeep(arr)
    cloneObj.forEach((item:any) => {
      if(item?.key == keyPath[1]) {
        item?.children.forEach((i:any) => {
            if(i.key == keyPath[0]) {
                  i.label = subm
            }
        })
       
      }
    })
    setArr(cloneObj)    
  }


  

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={arr}
            onClick={onClick}
          >  
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>      
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
          <Input  value={subm} onChange={(e)=>{
            setSubm(e.target.value)
          }} />
          <Button type="primary" onClick={save}>保存</Button>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;