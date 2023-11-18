import { PhoneIcon } from '@chakra-ui/icons';
import {Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SimpleGrid, Textarea, UseDisclosureReturn, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { createCustomerApi } from 'services/api';
import { PersonData } from 'types/personData';

export default function CustomerRegisterForm({ onClose }: { onClose: UseDisclosureReturn['onClose'] }) {
  const { register, setValue, setFocus, handleSubmit} = useForm();
  let textInputColor = useColorModeValue('gray.700', 'white');

  const checkCEP = (e: { target: { value: string; }; }) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (!e.target.value) return;
    console.log("Passou aqui")
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) => res.json()).then((data) => {
      setValue('state', data.uf);
      setValue('city', data.localidade);
      setValue('neighborhood', data.bairro);
      setValue('street', data.logradouro);
      setFocus('addressNumber');
    }).catch((err) => console.log(err));
  }

  const onSubmit = async (data: Partial<PersonData>) => {
    try {
      await createCustomerApi(data);
      onClose();
    } catch (error) {
      console.error('Erro ao criar o cliente:', error);
    }
  };

  return (
    <>
        <ModalHeader>Adicione um novo Cliente</ModalHeader>
        <ModalBody pb={6}>
          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid columns={2} spacing={10}>

                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input placeholder='Nome' color={textInputColor} {...register('name')}/>
                </FormControl>

                <FormControl>
                  <FormLabel>Sobrenome</FormLabel>
                  <Input placeholder='Sobrenome' color={textInputColor} {...register('last_name')}/>
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' placeholder='usuario@gmail.com' color={textInputColor} {...register('email')} />
                </FormControl>

                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <PhoneIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type='tel' {...register('phone')}/>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <Input placeholder='CPF' color={textInputColor} {...register('cpf')}/>
                </FormControl>

                <FormControl>
                  <FormLabel>RG</FormLabel>
                  <Input placeholder='RG' color={textInputColor} {...register('rg')}/>
                </FormControl>

                <FormControl>
                  <FormLabel>CEP</FormLabel>
                  <Input placeholder='CEP' type="text" color={textInputColor} {...register('cep')} onBlur={checkCEP}/>
                </FormControl>

                <FormControl display={'block'}>
                  <FormLabel>Endereço</FormLabel>
                  <Input  placeholder='Estado' color={textInputColor} {...register('state')} />
                  <Input marginTop={'10px'} placeholder='Cidade' color={textInputColor} {...register('city')}/>
                  <Input marginTop={'10px'} placeholder='Bairro' color={textInputColor} {...register('neighborhood')}/>
                  <Input marginTop={'10px'} placeholder='Rua' color={textInputColor} {...register('street')}/>
                  <Input marginTop={'10px'} placeholder='Número' color={textInputColor}  {...register('addressNumber')}/>
                </FormControl>

              </SimpleGrid>

              <FormControl mt={6}>
                <FormLabel>Observações</FormLabel>
                <Textarea placeholder='Deixe uma observação' {...register('observation')} />
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme='green' mr={3}>Salvar</Button>
                <Button onClick={onClose} variant='outline' colorScheme='red'>Cancelar</Button>
              </ModalFooter>
            </form>
          </Container>
        </ModalBody>
    </>
  )
}