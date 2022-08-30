import { Component, useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFood';
import { IFood } from '../../type';

function Dashboard()  {
   const {foods, addFood} = useFoods();
   const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
   const [modalOpen, setModalOpen]= useState(false);
   const [editModalOpen, setEditModalOpen]= useState(false);


  async function handleAddFood(newFood: IFood){
    
    addFood(newFood);
  };

  async function handleDeleteFood(id){

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal(){
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(){   
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food:IFood){
    setEditingFood(food);
    setEditModalOpen(true);
  }
    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

export default Dashboard;
