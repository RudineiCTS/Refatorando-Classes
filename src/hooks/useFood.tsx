import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { IFood } from "../type";

interface FoodProviderProps{
  children: ReactNode;
}

interface FoodContextData {
  foods: IFood[],
  addFood:(food:IFood) =>Promise<void>
  updateFood:(editingFood:IFood, foodItem:IFood) =>Promise<void>
}

const FoodContext = createContext({} as FoodContextData);

export function FoodProvider({children}:FoodProviderProps){
  const [foods, setFoods] = useState<IFood[]>([]);

  useEffect(() => {
    api.get('/foods')
      .then(response =>{
        setFoods(response.data)
      })
  },[]);



  const addFood= async(newFood:IFood)=>{
    try {
      const response = await api.post('/foods', {
        ...newFood,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const updateFood= async(editingFood:IFood, foodItem:IFood)=>{ 
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...foodItem },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <FoodContext.Provider value={{foods, addFood, updateFood}}>
      {children}
    </FoodContext.Provider>
  )

}

export function useFoods(){
  const context = useContext(FoodContext);
  return context;
}