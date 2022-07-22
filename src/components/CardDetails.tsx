import { ReactNode } from 'react';
import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { IconProps } from 'phosphor-react-native';

interface Props {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetails({ title, description, footer = null, icon: Icon, children}: Props) {
    const { colors } = useTheme();
  
    return (
    <VStack bg='gray.600' p={5} mt={5} rounded='sm'>
        <HStack flex={1} alignItems='center' mb={4}>
            <Icon color={colors.primary[700]}/>
            <Text ml={2} color='gray.300' fontSize='sm' textTransform='uppercase'>
                {title}
            </Text>
        </HStack>

            {
                //description é tem uma tipagem de string e para transformar em boolean é só colocar duas exclamações
                !!description && 
                    <Text color='gray.100' fontSize='md'> 
                        {description}
                    </Text>
            }

            {children}

            {
                !!footer && 
                    <Box borderTopColor='gray.400' borderTopWidth={1} mt={3}>
                        <Text mt={3} color='gray.300' fontSize='sm'>
                            {footer}
                        </Text>
                    </Box>
            }
    </VStack>
  );
}