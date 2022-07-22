import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore'
import { HStack, ScrollView, Text, useTheme, VStack, Modal } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';

import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { Loading } from '../components/Loading'
import { dateFormat } from '../utils/firestoreDateFormat';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import { ModalBox } from '../components/ModalBox';

interface RouteParams {
  orderId: string;
}

interface OrderDetails extends OrderProps {
  description: string;
  solution: string;
  closed: string;
} 

export function Details() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [solution , setSolution] = useState('');
  const [order , setOrder] = useState<OrderDetails>({} as OrderDetails);
  
  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  function handleOrderClose () {
    if(!solution) {
      return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação')
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação encerrada.')
      navigation.goBack();
    })
    .catch(error => {
      console.log(error);
      Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.')
    })
  }

  function handleOrderOpenAgain () {
    if(order.status === 'closed') {
        firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .update({
          status: 'open',
          solution,
          created_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          Alert.alert('Solicitação', 'Solicitação reaberta.')
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Solicitação', 'Não foi possível reabrir a solicitação.')
      })
    }
  }
  
  
  useEffect(() => {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {
      const { 
        patrimony,
        description,
        status,
        created_at,
        closed_at,
        solution,  
       } = doc.data();

       const closed = closed_at ? dateFormat(closed_at) : null; 

       setOrder({
        id: doc.id,
        patrimony,
        description, 
        status,
        solution,
        when: dateFormat(created_at),
        closed,
       });

       setIsLoading(false)
    })
  },[])

  if(isLoading){
    return <Loading/>
  }

  return (
    <VStack flex={1} bg='gray.700'>

        <Header title='Solicitação' px={6}/>

        <HStack bg='gray.500' justifyContent='center' p={4}>
          { 
            order.status === 'closed' 
            ? <CircleWavyCheck color={colors.green[300]}/>
            : <Hourglass color={colors.secondary[700]}/>
          }

          <Text
            fontSize='sm'
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
            ml={2}
            textTransform='uppercase'
          >
            {order.status === 'closed' ? 'Finalizado' : 'Em andamento' }
          </Text>
        </HStack>

        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails
            title='Equipamento'
            description={`Patrimonio ${order.patrimony}`}
            icon={DesktopTower}
          />

          <CardDetails
            title='Descrição do problema'
            description={order.description}
            icon={ClipboardText}
            footer={`Registrado em ${order.when}`}
          />

          <CardDetails
            title='Solução'
            icon={CircleWavyCheck}
            description={order.solution}
            footer={order.closed && `Encerrado em ${order.closed}`}
          >
            {
              order.status === 'open' &&
              <Input
              placeholder='Descrição da solução'
              onChangeText={setSolution}
              textAlignVertical='top'
              multiline
              h={24}
              />
            }

          </CardDetails>
        </ScrollView>

        {
          order.status === 'open' &&
            <Button
              title='Encerrar solicitação'
              m={5}
              onPress={handleOrderClose}
            />
        } 

      {
          order.status === 'closed' &&
            

            <ModalBox changeVisibility={true}>
            <Button
              bgColor='secondary.700'
              title='Reabrir solicitação'
              m={5}
              onPress={handleOrderOpenAgain}
            />
            </ModalBox>
        } 
    </VStack>
  );
}