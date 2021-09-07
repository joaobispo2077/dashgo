import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../hooks/useSidebarDrawer';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const { onOpen } = useSidebarDrawer();
  const isDesktopScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isDesktopScreen && (
        <IconButton
          aria-label="Open navigation"
          variant="unstyled"
          mr="2"
          onClick={onOpen}
          icon={<Icon as={RiMenuLine} fontSize="24" />}
        ></IconButton>
      )}
      <Logo />

      {isDesktopScreen && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isDesktopScreen} />
      </Flex>
    </Flex>
  );
}
