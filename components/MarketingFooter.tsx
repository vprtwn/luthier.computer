import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

export default (props) => {
  return (
    <Box sx={{ textAlign: 'center', my: 4, py: 1, px: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Flex sx={{ bg: 'transparent', borderRadius: 4, border: '1px solid gray', alignItems: 'center' }}>
          <Flex sx={{ alignItems: 'center', color: 'gray' }}>
            <Box sx={{ pl: 2, pr: 4, fontWeight: 'bold', fontSize: '11px' }}>
              <Link href="/" variant="nav">
                <i>flexjar</i>
              </Link>
            </Box>
          </Flex>
          <Link href="/policies" variant="nav" sx={{ mx: 2, py: 1, fontSize: '10px', color: 'gray' }}>
            Policies
          </Link>
        </Flex>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
