import AsyncStorage from "@react-native-async-storage/async-storage";

interface GoalNode {
  title: string;
  type?: string;
  color: string;
}

export async function storeGoal({ title, type, color }: GoalNode) {
  try {
    const jsonValue = await AsyncStorage.getItem("goals");
    const currentGoals = jsonValue != null ? JSON.parse(jsonValue) : null;

    const newData = { title, type, color, tasks: [] };

    const joinGoals = currentGoals ? [...currentGoals, newData] : [newData];

    const finalValue = JSON.stringify(joinGoals);

    await AsyncStorage.setItem("goals", finalValue);
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

interface removeNode {
  title: string;
  type?: string;
}

export async function removeGoals({ title, type }: removeNode) {
  try {
    const jsonValue = await AsyncStorage.getItem("goals");
    const currentGoals = jsonValue != null ? JSON.parse(jsonValue) : null;

    let newArray = currentGoals.filter(
      (item: any) => item.title !== title && item.type !== type
    );

    const finalValue = JSON.stringify(newArray);
    await AsyncStorage.setItem("goals", finalValue);
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

interface StoreNode {
  title: string;
  type?: string;
  newTasks: Array<{ title: string; completed: boolean }>;
}

export async function storeTask({ title, type, newTasks }: StoreNode) {
  try {
    const jsonValue = await AsyncStorage.getItem("goals");
    const currentGoals = jsonValue != null ? JSON.parse(jsonValue) : null;

    const index = currentGoals.findIndex(
      (obj: { title?: string; type?: string }) =>
        obj.title == title && obj.type == type
    );

    currentGoals[index].tasks = newTasks;

    const finalValue = JSON.stringify(currentGoals);
    await AsyncStorage.setItem("goals", finalValue);
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export async function getGoals(
  setGoals: React.Dispatch<React.SetStateAction<never[]>>
) {
  try {
    const jsonValue = await AsyncStorage.getItem("goals");
    const finalValue = jsonValue != null ? JSON.parse(jsonValue) : null;

    finalValue && setGoals(finalValue);
  } catch (e) {
    console.log(e);
  }
}

// AsyncStorage.removeItem("goals");
