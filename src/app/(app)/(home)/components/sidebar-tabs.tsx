import * as Tabs from '@radix-ui/react-tabs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Binoculars, ChartLineUp, User } from 'phosphor-react'
import { useEffect, useState } from 'react'

import logo from '@/app/assets/bookwise-logo.svg'

import { TabItem } from './tab-item'

interface SideBarTabsProps {
  isCurrentUserAuthenticated: boolean
}

export function SideBarTabs({ isCurrentUserAuthenticated }: SideBarTabsProps) {
  const pathName = usePathname()

  const [currentTab, setCurrentTab] = useState(pathName.substring(1))

  useEffect(() => {
    setCurrentTab(pathName.substring(1))
  }, [pathName])

  return (
    <Tabs.Root
      className="flex flex-col gap-16  px-12"
      value={currentTab}
      onValueChange={setCurrentTab}
    >
      <Image src={logo} alt="" />

      <Tabs.List className="flex flex-col gap-4">
        <TabItem
          value="start"
          title="Início"
          icon={ChartLineUp}
          isSelected={currentTab === 'start'}
        />

        <TabItem
          value="explore"
          title="Explorar"
          icon={Binoculars}
          isSelected={currentTab === 'explore'}
        />

        {isCurrentUserAuthenticated && (
          <TabItem
            value="profile"
            title="Perfil"
            icon={User}
            isSelected={currentTab === 'profile'}
          />
        )}
      </Tabs.List>
    </Tabs.Root>
  )
}
