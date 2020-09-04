import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

export default (props) => {
  return (
    <Box sx={{ textAlign: 'center', my: 4, py: 1, px: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Flex sx={{ bg: 'transparent', borderRadius: 4, border: '1px solid gray', alignItems: 'center' }}>
          <Flex sx={{ alignItems: 'center', color: 'gray' }}>
            <Text sx={{ fontSize: '9px', ml: 2, mr: 1 }}>made with</Text>
            <Box sx={{ fontWeight: 'bold', fontSize: '11px', mr: 2 }}>
              <Link href="/" variant="nav">
                <i>flexjar</i>
              </Link>
            </Box>
          </Flex>
        </Flex>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
