import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { IFood } from '../../type';
import { useFoods } from '../../hooks/useFood';

interface ModalEditFoodProps{
  setIsOpen:()=>void;
  isOpen: boolean,
  editingFood: IFood,
}

function ModalEditFood({editingFood, isOpen,setIsOpen}:ModalEditFoodProps){
  const {updateFood} = useFoods();

  const handleSubmit = async (data:IFood) => {
    updateFood(editingFood,data)
    setIsOpen();
  };

  // render() {
  //   const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }

export default ModalEditFood;
