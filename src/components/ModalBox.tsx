
import React from 'react';
import {Modal, ScrollView, Text, Center, Button, VStack} from 'native-base'
import { Button as ButtonComponentStyled } from '../components/Button'

type Props = {
  changeVisibility: true | false;
  children: any;
}

export function ModalBox({changeVisibility, children}: Props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  function handleSizeClick  () {
    setModalVisible(changeVisibility);
  };

  return <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size='xl' >
        <Modal.Content maxH="xl">
          <Modal.CloseButton />
          <Modal.Header>Solicitação</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>
                Está solicitação já foi finalizada, se deseja
                reabri-lá confirme abaixo.
              </Text>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancelar
              </Button>
                {children}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack 
        px={6}
        mb={6}
      >
        <Button 
          bg="secondary.500" 
          h={14}
          fontSize='sm'
          rounded='sm'
          _pressed={{bg: 'secondary.700'}}
          onPress={handleSizeClick}
          p={4}
        >
          Reabrir solicitação
        </Button>
      </VStack>
    </>;
}